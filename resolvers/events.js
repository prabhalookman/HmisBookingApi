import { ObjectId } from 'bson';
import moment from 'moment';
import {
  getServicesbyStaffId,
  uniqueFromArr,
  avail_date_filter,
  groupArray,
  getLocataion_workDay,
  getStaffLocations,
  getEventLocations
} from '../helpers/slotcreation'
export default {
  Query: {
    getEvents: async (parent, args, context, info) => {
      try {
        let findObj = {workspace_id: ObjectId(args.workspace_id) , site_id: ObjectId(args.site_id) , staff: ObjectId(args.staff_ids) }
        console.log(findObj)
        let even = await context.models.Events.find(findObj)
        return even
      } catch (error) {
        console.error("Error : ", error)
        throw new Error (error)
      }
    },
    getEventsDetailByStaff: async (parent, args, context, info) => {
      try {
        let findObj = {workspace_id: ObjectId(args.workspace_id) , site_id: ObjectId(args.site_id) , staff: ObjectId(args.staff_ids) }
        let staffEvent = await context.models.Staff.find(findObj)
        console.log(`\n staffEvent Count : `, staffEvent.length)
        let result_events = await getServicesbyStaffId(args, context)
         const events_result = await context.models.Events.find({_id: result_events})
        return events_result
      } catch (error) {
        console.error("Error : ", error)
        throw new Error (error)
      }
    },
    getEnabledDate: async (parent, args, context, info) => {
      try {
        let timings_day = []
        let event_loc_ar = []
        let staff_loc_ar = await getStaffLocations(args, context)
        let events = await getEventLocations(args, context)
        let event_id = events[0].locationsetting[0].events_id;

        console.log("events : ", events);
        event_loc_ar.push({
          event_id: event_id,
          data: events[0].locationsetting,
        });
        console.log(`getEnabledDate event_loc_ar  : , ${event_loc_ar}`);

        timings_day = await getLocataion_workDay(context, staff_loc_ar, event_loc_ar, 'date_get')
        args.timings_day = timings_day
        //console.log('rsp : '. rsp)
        let matched_loc = []
        let result = await avail_date_filter(args, context);
        return result;
      } catch (error) {
        throw new Error(error)
      }
    },
    getLocationByServiceId: async (parent, args, context, info) => {
      try {
        let locationEvents = await context.models.Events.find({  workspace_id: args.workspace_id, site_id:args.site_id, _id:args.event_id })
        return locationEvents        
      } catch (error) {
        console.error("Error : ", error)
      }
    } 
  }, //Query End
  Events: {
    timing_ids: async (evens, args, context) => {
      let resultEvent = await evens.populate('timing_ids').execPopulate();
      return resultEvent.timing_ids
  },
  workspace_id: async (evens, args, context) => {
      let resultEvent = await evens.populate('workspace_id').execPopulate();
      return resultEvent.workspace_id
  },
  site_id: async (evens, args, context) => {
      let resultEvent = await evens.populate('site_id').execPopulate();
      return resultEvent.site_id
  },
  staff: async (evens, args, context) => {
    let resultEvent = await evens.populate('staff').execPopulate();
    return resultEvent.staff
  },
  location_setting_ids: async (evens, args, context) => {
    let resultEvent = await evens.populate('location_setting_ids').execPopulate();
    return resultEvent.location_setting_ids
},
add_on_ids: async (evens, args, context) => {
  let resultEvent = await evens.populate('add_on_ids').execPopulate();
  return resultEvent.add_on_ids
}

    
  }
}
/*

      timing_ids: async (evens, args, context) => {
          let resultEvent = await evens.populate('timing_ids').execPopulate();
          return resultEvent.timing_ids
      },
      workspace_id: async (evens, args, context) => {
          let resultEvent = await evens.populate('workspace_id').execPopulate();
          return resultEvent.workspace_id
      },
      site_id: async (evens, args, context) => {
          let resultEvent = await evens.populate('site_id').execPopulate();
          return resultEvent.site_id
      },
      staff: async (evens, args, context) => {
        let resultEvent = await evens.populate('staff').execPopulate();
        return resultEvent.staff
      },
      location_setting_ids: async (evens, args, context) => {
        let resultEvent = await evens.populate('location_setting_ids').execPopulate();
        return resultEvent.location_setting_ids
    },
    add_on_ids: async (evens, args, context) => {
      let resultEvent = await evens.populate('add_on_ids').execPopulate();
      return resultEvent.add_on_ids
  }
  */
/*
function testDate(){
  var format = "HH:mm:ss";
var hourFormat = "HH:mm";
var maxStartHour = moment("07:00:00", format);
var minEndHour = moment("19:00:00", format);
console.log('maxStartHour : ', maxStartHour)
var arrayOfWorkDates = [

  {
    start: "2018-02-24T14:00:00",
    end: "2018-02-24T15:00:00"
  },
  {
    start: "2018-02-24T05:00:00",
    end: "2018-02-24T06:00:00"
  },
  {
    start: "2018-02-24T20:00:00",
    end: "2018-02-24T21:00:00"
  }
];


var filteredWokrHours = arrayOfWorkDates.filter(function(el) {

  var start = moment(el.start).format(hourFormat);
  var end = moment(el.end).format(hourFormat);

  var checkHourStart = moment(start, format);
  var checkHourEnd = moment(end, format);

  return checkHourStart.isBefore(maxStartHour) || checkHourEnd.isAfter(minEndHour);
});

if(filteredWokrHours.length > 0){console.log("success: " + filteredWokrHours.length);}else{console.log("fail");}
}*/