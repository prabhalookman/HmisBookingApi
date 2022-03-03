
import { ObjectId } from 'bson';
import moment from 'moment-timezone';
import {  
  get_staff_locationsettings_agg_bht,
  get_staff_locationsettings_agg_bhf,
  get_event_locationsettings_agg_bht,
  get_event_locationsettings_agg_bhf,
  get_locationsettings_agg,
  bushiness_timings_agg  
} from '../helpers/aggregateFunctions'
import { 
  getAvailability,
  date_check,
  locations_arr,
  getLocataion_workDay,
  getStaffLocations,
  getEventLocations,
  getStaffbyServiceId
  
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
    //Get Staffs for service dropdown
    getstaffdetailbyservice: async (parent, args, context, info) => {
      try {
        let findObj = {workspace_id: ObjectId(args.workspace_id) , site_id: ObjectId(args.site_id) , staff: ObjectId(args.event_ids) }
        let staffEvent = await context.models.Staff.find(findObj)
        console.log(`\n staffEvent Count : `, staffEvent.length)
        let result_staffs = await getStaffbyServiceId(args, context)
         const staff_result = await context.models.Staff.find({_id: result_staffs})
        return staff_result
      } catch (error) {
        console.error("Error : ", error)
        throw new Error (error)
      }
  },
  
},StaffDetails: {
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