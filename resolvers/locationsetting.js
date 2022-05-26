import { ObjectId } from 'bson';
import {
  get_locationsettings_agg,  
} from '../helpers/aggregateFunctions'
import {   
  date_check,  
  getLocataion_workDay,
  getStaffLocations,
  getEventLocations,
  
} from '../helpers/slotcreation'
export default {
  Query: {
    getLocationSetting: async (parent, args, context, info) => {
      try {
        let findObj = {workspace_id: ObjectId(args.workspace_id), site_id: ObjectId(args.site_id)}
        //console.log(findObj)
        let loc_result = await context.models.LocationSetting.find(findObj).exec()
        return loc_result
      } catch (error) {
        console.error("Error : ", error)
        throw new Error(error)
      }
    },getLocationSettingById: async (parent, args, context, info) => {
      try {
        let findObj = {workspace_id: ObjectId(args.workspace_id), site_id: ObjectId(args.site_id), _id: args.location_id}
        //console.log(findObj)
        let loc_result = await context.models.LocationSetting.find(findObj).exec()
        return loc_result
      } catch (error) {
        console.error("Error : ", error)
        throw new Error(error)
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

      let staff_loc_ar = await getStaffLocations(args, context)      
       let event_loc_ar = []

      // let staff_loc_ar = await getStaffLocations(args, context)
   
    if (staff_loc_ar.length > 0) {
      if (staff_loc_ar[0].locationsetting.length > 0) {
        if (staff_loc_ar[0].locationsetting[0].events_id.length > 0) {
          let event_ids = [];
          staff_loc_ar[0].locationsetting[0].events_id.forEach((el) => {
            event_ids.push(el.toString());
          });
          //console.log("getStaffEventLocationSettings events_id Before loop : ", event_ids);
          if (event_ids.includes(args.event_id)) {
            let events = await getEventLocations(args, context); //getEventLocation group by timings
            //console.log("events : ", events);
            event_loc_ar.push({
              event_id: args.event_id,
              data: events[0].locationsetting,
            });
          }
          //console.log(`getStaffEventLocationSettings : , ${event_loc_ar}`);
        }
      }
    }

      let rsp = await  getLocataion_workDay(args,context,staff_loc_ar[0].locationsetting, event_loc_ar, 'location_get')
      ////console.log('rsp locations: ', JSON.stringify(rsp)  )
      //let loc_result = []
      // for(let i=0; i< rsp.length; i++){
      //   //let data =  await context.models.LocationSetting.aggregate(get_locationsettings_agg(rsp[i]))
      //   let obj = {_id: ObjectId(rsp[i]) }
      //   await context.models.LocationSetting.find(findObj)
      // }
      //console.log('resp : ', rsp)
       let obj = {_id: rsp}
      // let findObj = {workspace_id: ObjectId(args.workspace_id), site_id: ObjectId(args.site_id)}
      //console.log('resp : ', obj)
      let loc_result =  await context.models.LocationSetting.find(obj).exec()
      let matched_loc = []
      
      if(loc_result == undefined){
        //console.log('getStaffEventLocationSettings : Staff and Event location name does not match')
        throw new Error('getStaffEventLocationSettings : Staff and Event location names does not match')
      }

      // let result = {
      //   displaySettings,
      //   selectedDate: selectedDate,
      //   start_date: start_date,
      //   end_date: end_date,
      //   pre_booking_day,
      //   clientSlot,
      //   available_date,
      //   disable_date,
      //   locationAvailable:rsp.locations
      // }

      return loc_result
      
    } catch (error) {
      console.error("Error : ", error)
      throw new Error(error)
    }
/*
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
      */
    },    
  },
  LocationSetting: {
    site_id: async (locsetting, args, context) => {
      const resultData = await locsetting.populate({path: 'site_id'}).execPopulate();
      return resultData.site_id
    },
    workspace_id: async (locsetting, args, context) => {
      const resultData = await locsetting.populate({path: 'workspace_id'}).execPopulate();
      return resultData.workspace_id
    },
    location_id: async (locsetting, args, context) => {
      const resultData = await locsetting.populate({path: 'location_id'}).execPopulate();
      return resultData.location_id
    }
    
  }
}