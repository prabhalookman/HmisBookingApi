
import { ObjectId } from 'bson';
import moment from 'moment-timezone';
import {  
  get_staff_locationsettings_agg_bht,
  get_staff_locationsettings_agg_bhf,
  get_event_locationsettings_agg_bht,
  get_event_locationsettings_agg_bhf,
  bushiness_timings_agg
} from '../helpers/aggregateFunctions'
import { 
  getAvailability,
  date_check,
  locations_arr
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
        let resp_result = getAvailability(args, context)
        return resp_result;
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

      let ev_business_time = await context.models.Events.aggregate(bushiness_timings_agg(args.event_id, args.workspace_id,args.site_id, 'event'));
      if(ev_business_time[0].business_hours){
        event_loc_ar = await context.models.Events.aggregate(get_event_locationsettings_agg_bht(args.event_id, args.workspace_id,args.site_id));
      } else {
        event_loc_ar = await context.models.Events.aggregate(get_event_locationsettings_agg_bhf(args.event_id, args.workspace_id,args.site_id));
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
      
      let business_time = await context.models.Events.aggregate(bushiness_timings_agg(args.event_id, args.workspace_id,args.site_id, 'event'));
      if(business_time[0].business_hours){
        loc_ar = await context.models.Events.aggregate(get_event_locationsettings_agg_bht(args.event_id, args.workspace_id,args.site_id));
      } else {
        loc_ar = await context.models.Events.aggregate(get_event_locationsettings_agg_bhf(args.event_id, args.workspace_id,args.site_id));
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