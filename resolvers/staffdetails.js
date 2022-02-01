
import { ObjectId } from 'bson';
import moment from 'moment-timezone';
import {  
  aggregate_bhf,
  aggregate_bht,
  get_staffdetail_agg,
  get_staff_locationsettings_agg_bht,
  get_staff_locationsettings_agg_bhf,
  get_event_locationsettings_agg_bht,
  get_event_locationsettings_agg_bhf,
  bushiness_timings_agg
} from '../helpers/aggregateFunctions'
import {  
  getting_slots,
  compareTwoSlots,
  checkBooking,
  removeByAttr,
  date_check,
  locations_arr,
  result
} from '../helpers/slotcreation'
export default {
  Query: {
    getStaffDetails: async (parent, args, context, info) => {
      try {
        let findObj = { site_id: ObjectId(args.site_id) , workspace_ids: ObjectId(args.workspace_id)  }
        let staffDetails = await context.models.StaffDetails.find(findObj)
        return staffDetails
      } catch (error) {
        console.error("Error : ", error)
        throw new Error (error)
      }
    },
    getAvailabilityByStaff: async (parent, args, context, info) => {
      
      try {
        let displaySettings = '12'
        let minutesFormat = "HH:mm";
        const dateFormat = "YYYY-MM-DD HH:mm:ss";
        let selectedDate = moment(args.date, "YYYY-MM-DD"); 
        console.log(`selectedDate.isValid() : ${selectedDate.isValid()} : ${selectedDate}`)

        let settings = await context.models.Setting.find({})
        const pre_booking_day = settings[0].advance_Booking_Period.value
        const clientSlot = settings[0].client_time_slot

        let minDate = moment(new Date(), dateFormat)
        let cr_date = moment(new Date()).startOf('day');
      
        let bookingStartDate = moment(new Date(), dateFormat)
        let maxDate = moment(new Date(), dateFormat).add(pre_booking_day - 1, 'days');
        if(selectedDate<cr_date){
          throw new Error('Selected date should be greater than current date')
        }

        console.log('minDate : ', minDate.format(dateFormat));
        console.log('maxDate : ', maxDate.format(dateFormat));

        let staffdetail_ag_rs;
        let staffDetail_ar = await context.models.Staff.aggregate(get_staffdetail_agg(args.staff_ids,args.workspace_id,args.site_id));
        let staffDetails = staffDetail_ar[0].staffDetails[0]
        if (staffDetails.business_timings) {

          let staff_pipeline = aggregate_bht(args.staff_ids, 'staff', true)
          staffdetail_ag_rs = await context.models.Staff.aggregate(staff_pipeline);

        } else {

          let staff_pipeline = aggregate_bhf(args.staff_ids, 'staff', false)
          staffdetail_ag_rs = await context.models.Staff.aggregate(staff_pipeline);
          console.log('staffdetail_ag_rs : ', staffdetail_ag_rs.length)
        }
        if(staffdetail_ag_rs.length == 0){
          console.error("Staff is empty : ", error)
          throw new Error ("Staff is empty")
        }
        let newStaffs = null;
        let staffList = []
        let staffResult = [];

        if (staffdetail_ag_rs && staffdetail_ag_rs.length > 0) {
          
          for(let j =0; j< staffdetail_ag_rs.length; j++){
            staffdetail_ag_rs[j].locationsetting_id = staffdetail_ag_rs[j].locationsetting_id
            staffdetail_ag_rs[j].appintegration_id = staffdetail_ag_rs[j].appintegration_id
            staffdetail_ag_rs[j].is_installed = staffdetail_ag_rs[j].is_installed ? staffdetail_ag_rs[j].is_installed[0]:[]
            staffdetail_ag_rs[j].app_name = staffdetail_ag_rs[j].app_name ? staffdetail_ag_rs[j].app_name[0]:[]
            staffdetail_ag_rs[j].location_name = staffdetail_ag_rs[j].location_name ? staffdetail_ag_rs[j].location_name[0]:[]
            staffdetail_ag_rs[j].location_type = staffdetail_ag_rs[j].location_type ? staffdetail_ag_rs[j].location_type[0]:[]
            staffdetail_ag_rs[j].location_app_integration_need = staffdetail_ag_rs[j].location_app_integration_need ? staffdetail_ag_rs[j].location_app_integration_need[0]:[]
          }
          let k = staffdetail_ag_rs.length;
          console.log("staffdetail_ag_rs  count : ", k)
          while(k--){
          //for (let k = 0; k < staffdetail_ag_rs.length; k++) {
            
              let newRes = new result("", "", 0, [], [], "", [], [], "", "")
              let location_flag = false
              //staffdetail_ag_rs[k].location_name.forEach((stf)=>{
                args.locationName.forEach((loc)=>{
                  if(loc == staffdetail_ag_rs[k].location_name){
                    location_flag = true
                  }
                })
              //})
              if (location_flag) {
                newStaffs = await getting_slots('Staff',staffdetail_ag_rs[k], context, newRes, displaySettings, minutesFormat, bookingStartDate, clientSlot, minDate, maxDate, selectedDate, args.date, dateFormat, pre_booking_day)
                newStaffs ? staffResult.push(newStaffs) : 0
              } else {
                //staffdetail_ag_rs.splice(staffdetail_ag_rs.indexOf(staffdetail_ag_rs[k]._id),1)
                staffdetail_ag_rs =  removeByAttr(staffdetail_ag_rs,'location_name',staffdetail_ag_rs[k].location_name.toString() )
                console.error("location_flag not match ")
                //throw new Error ("Location Name  not match with staff location ")
              }
            //}
          }
          
        }
        if(staffdetail_ag_rs.length == 0) {
          console.error("Staff location does not match with selected location.")
          throw new Error ("Staff location does not match with selected location.")
        }
        
        let newEvents = null;
        let eventList = []
        let eventResult = [];
        let events_ag_rs = [];
        let events = [];

        for (let q = 0; q < args.event.length; q++) {
          events = await context.models.Event.find({ _id: ObjectId(args.event[q])  })
          if(events.length == 0){
            console.error("Event id is not available")
            throw new Error ("Event id is not available")
          }
          if (events[0].business_timings) {
            let event_pipeline = aggregate_bht(args.event[0], 'event')
            events_ag_rs = await context.models.Event.aggregate(event_pipeline);
            console.log('events_ag_rs BHT : ', events_ag_rs.length)
          } else {
            let event_pipeline = aggregate_bhf(args.event[0], 'event')
            events_ag_rs = await context.models.Event.aggregate(event_pipeline);
            console.log('events_ag_rs BHF : ', events_ag_rs.length)
          }
        }
        if(events_ag_rs.length == 0){
          console.error("Event is empty")
          throw new Error ("Event is empty")
        }
        
        if(events_ag_rs && events_ag_rs.length > 0){
          for(let j =0; j< events_ag_rs.length; j++){
            events_ag_rs[j].locationsetting_id = events_ag_rs[j].locationsetting_id
            events_ag_rs[j].appintegration_id = events_ag_rs[j].appintegration_id
            events_ag_rs[j].is_installed = events_ag_rs[j].is_installed ? events_ag_rs[j].is_installed[0]:[]
            events_ag_rs[j].app_name = events_ag_rs[j].app_name ? events_ag_rs[j].app_name[0]:[]
            events_ag_rs[j].location_name = events_ag_rs[j].location_name ? events_ag_rs[j].location_name[0]:[]
            events_ag_rs[j].location_type = events_ag_rs[j].location_type ? events_ag_rs[j].location_type[0]:[]
            events_ag_rs[j].location_app_integration_need = events_ag_rs[j].location_app_integration_need ? events_ag_rs[j].location_app_integration_need[0]:[]
          }
          let k = events_ag_rs.length;
          console.log("events_ag_rs  count : ", k)
          while(k--){
            //for (let k = 0; k < events_ag_rs.length; k++) {
              
                let newRes = new result("", "", 0, [], [], "", [], [], "", "")
                let location_flag = false
                //events_ag_rs[k].location_name.forEach((stf)=>{
                  args.locationName.forEach((loc)=>{
                    if(loc == events_ag_rs[k].location_name){
                      location_flag = true
                    }
                  })
                //})
                if (location_flag) {
                  newEvents = await getting_slots('Event',events_ag_rs[k], context, newRes, displaySettings, minutesFormat, bookingStartDate, clientSlot, minDate, maxDate, selectedDate, args.date, dateFormat, pre_booking_day)
                  newEvents ? eventResult.push(newEvents) : 0
                } else {
                  //events_ag_rs.splice(events_ag_rs.indexOf(events_ag_rs[k]._id),1)
                  events_ag_rs =  removeByAttr(events_ag_rs,'location_name',events_ag_rs[k].location_name.toString() )
                  console.error("location_flag not match ")
                  //throw new Error ("Location Name  not match with staff location ")
                }
              //}
            }
        }
        if(events_ag_rs.length == 0) {
            console.error("Event location does not match with selected location.")
            throw new Error ("Event location does not match with selected location.")
          }
        

        let resp_result = {}
        staffResult.availableTimes = await checkBooking(staffResult[0], args.date, context.models, args.staff_ids, args.event)
        let events_availableTimes = compareTwoSlots(staffResult, eventResult)
        resp_result.start_date = eventResult[0].start_date
        resp_result.end_date = eventResult[0].end_date
        resp_result.pre_booking_day = eventResult[0].pre_booking_day
        resp_result.available_date = eventResult[0].available_date
        resp_result.disable_date = eventResult[0].disable_date
        resp_result.selectedDate = eventResult[0].selectedDate
        resp_result.displaySettings = eventResult[0].displaySettings
        resp_result.locationAvailable = args.location
        resp_result.availableTimes = [];
        if(events_availableTimes.length>0){
          events_availableTimes.forEach(e => {
            resp_result.availableTimes.push(e)
          })
        }

        return resp_result
      } catch (error) {
        console.error("Error : ", error)
        throw new Error (error)
      }
    },
    getStaffEventLocationSettings: async(parent, args, context, info)=> {
      try {

      const {
        displaySettings,
        selectedDate,
        start_date,
        end_date,
        available_date,
        disable_date,
        pre_booking_day,
        clientSlot
      } = await date_check(args,context)

      let staff_loc_ar = [];
      let business_time = await context.models.Staff.aggregate(bushiness_timings_agg(args.staff_id, args.workspace_id,args.site_id, 'staff'));
      if(business_time[0].business_hours){
        staff_loc_ar = await context.models.Staff.aggregate(get_staff_locationsettings_agg_bht(args.staff_id, args.workspace_id,args.site_id));
      } else {
        staff_loc_ar = await context.models.Staff.aggregate(get_staff_locationsettings_agg_bhf(args.staff_id, args.workspace_id,args.site_id));
      }
      if(staff_loc_ar.length<1){
        throw new Error('Location setting not available in staff')
      }

      let event_loc_ar = []; 

      let ev_business_time = await context.models.Event.aggregate(bushiness_timings_agg(args.event_id, args.workspace_id,args.site_id, 'event'));
      if(ev_business_time[0].business_hours){
        event_loc_ar = await context.models.Event.aggregate(get_event_locationsettings_agg_bht(args.event_id, args.workspace_id,args.site_id));
      } else {
        event_loc_ar = await context.models.Event.aggregate(get_event_locationsettings_agg_bhf(args.event_id, args.workspace_id,args.site_id));
      }
      if(event_loc_ar.length<1){
        throw new Error('Location setting not available in event')
      }
      let stf_loc = locations_arr(staff_loc_ar)
      let ev_loc = locations_arr(event_loc_ar)
      let matched_loc = []
      if(stf_loc.length > 0 && ev_loc.length > 0){
        stf_loc.forEach((stf)=>{
          ev_loc.forEach((ev)=>{
            if(stf.location_name && ev.location_name) {
              if(stf.location_name.toLowerCase() == ev.location_name.toLowerCase()){
                matched_loc.push(stf)
              }
            }
            
          })
        })
      }
      if(matched_loc.length == 0){
        console.log('Staff and Event location name does not match')
        throw new Error('Staff and Event location names does not match')
      }

      let result = {
        displaySettings,
        selectedDate: selectedDate,
        start_date: start_date,
        end_date: end_date,
        pre_booking_day,
        clientSlot,
        available_date,
        disable_date,
        locationAvailable:matched_loc
      }

      return result
      
    } catch (error) {
      throw new Error(error)
    }

    },
    getEventLocationSettings: async(parent, args, context, info)=> {
      try {
        
        let displaySettings = '12'
      let minutesFormat = "HH:mm";
      const secondsFormat = "YYYY-MM-DD HH:mm:ss";
      const dateFormat = "YYYY-MM-DD";
      let selectedDate = moment(args.date, dateFormat);
      //console.log(`selectedDate.isValid() : ${selectedDate.isValid()} : ${selectedDate}`)

      let settings = await context.models.Setting.find({})
      const pre_booking_day = settings[0].advance_Booking_Period.value
      const clientSlot = settings[0].client_time_slot

      let minDate = moment(new Date(), secondsFormat)
      let cr_date = moment(new Date()).startOf('day');

      let maxDate = moment(new Date(), secondsFormat).add(pre_booking_day - 1, 'days');
      if(selectedDate<cr_date){
        throw new Error('Selected date should be greater than current date')
      }

      let available_date = [];
      let disable_date = [];
      
      let bookStartDate = moment(minDate, secondsFormat)
      while (bookStartDate <= maxDate) {
        if (bookStartDate.isoWeekday() == 6 || bookStartDate.isoWeekday() == 7) {
          disable_date.push(new moment(bookStartDate).format(dateFormat))
        } else {
          available_date.push(new moment(bookStartDate).format(dateFormat))
        }
        bookStartDate.add(1, 'days');
      }

      let loc_ar = []; let location_setting = [], locations = [];
      
      let business_time = await context.models.Event.aggregate(bushiness_timings_agg(args.event_id, args.workspace_id,args.site_id, 'event'));
      if(business_time[0].business_hours){
        loc_ar = await context.models.Event.aggregate(get_event_locationsettings_agg_bht(args.event_id, args.workspace_id,args.site_id));
      } else {
        loc_ar = await context.models.Event.aggregate(get_event_locationsettings_agg_bhf(args.event_id, args.workspace_id,args.site_id));
      }
      if(loc_ar.length<1){
        throw new Error('Location setting not available')
      }
        
        location_setting = loc_ar[0].locationsetting
        locations = loc_ar[0].location_type
        let loc = [];
        location_setting.forEach((elem)=>{
          let ls_value = {...elem}
          let rs = {
            locationsetting_id:ls_value.locationsetting_id,
            appintegration_id: ls_value.appintegration_id,
            is_installed:ls_value.is_installed ? ls_value.is_installed[0] : ls_value.is_installed,
            app_name: ls_value.app_name ? ls_value.app_name[0] : ls_value.app_name,
            location_id: ls_value.location_id ? ls_value.location_id[0] : ls_value.location_id,
            location_type: ls_value.location_type ? ls_value.location_type[0] : ls_value.location_type,
            location_name: ls_value.location_name ? ls_value.location_name[0] : ls_value.location_name ,
            location_app_integration_need: ls_value.location_app_integration_need ? ls_value.location_app_integration_need[0] : ls_value.location_app_integration_need 
          }
          loc.push(rs)
        })

        let result = {
          displaySettings,
          selectedDate: selectedDate.format(dateFormat),
          start_date: minDate.format(dateFormat),
          end_date: maxDate.format(dateFormat),
          pre_booking_day,
          clientSlot,
          available_date,
          disable_date,
          locationAvailable:loc
        }

        return result
        
      } catch (error) {
        throw new Error(error)
      }

    },
    getstaffdetailbyservice: async (parent, args, context, info) => {
      try {
        let findObj = { site_id: ObjectId(args.site_id), workspace_ids: ObjectId(args.workspace_id), events_ids: ObjectId(args.event_ids)  }
        let staffDetails = await context.models.StaffDetails.find(findObj)
        return staffDetails
      } catch (error) {
        console.error("Error : ", error)
        throw new Error (error)
      }
    }
  },
  StaffDetails: {
    site_id: async (locsetting, args, context) => {
      const resultStaffDetails = await locsetting.populate('site_id').execPopulate();
      return resultStaffDetails.site_id
    },
    workspace_id: async (locsetting, args, context) => {
      const resultStaffDetails = await locsetting.populate('workspace_id').execPopulate();
      return resultStaffDetails.workspace_id
    },
    business_id: async (locsetting, args, context) => {
      const resultStaffDetails = await locsetting.populate('business_id').execPopulate();
      return resultStaffDetails.business_id
    },
    address_ids: async (locsetting, args, context) => {
      const resultStaffDetails = await locsetting.populate('address_ids').execPopulate();
      return resultStaffDetails.address_ids
    },
    timing_ids: async (locsetting, args, context) => {
      const resultStaffDetails = await locsetting.populate('timing_ids').execPopulate();
      return resultStaffDetails.timing_ids
    },
    sorting_id: async (locsetting, args, context) => {
      const resultStaffDetails = await locsetting.populate('sorting_id').execPopulate();
      return resultStaffDetails.sorting_id
    },
    events_ids: async (locsetting, args, context) => {
      const resultStaffDetails = await locsetting.populate('events_ids').execPopulate();
      return resultStaffDetails.events_ids
    },
    location_setting_ids: async (locsetting, args, context) => {
      const resultStaffDetails = await locsetting.populate('location_setting_ids').execPopulate();
      return resultStaffDetails.location_setting_ids
    }
  }
}