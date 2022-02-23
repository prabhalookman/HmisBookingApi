import { ObjectId } from 'bson';
import moment from 'moment';
import {
  getServicesbyStaffId,
  uniqueFromArr,
  avail_date_filter,
  groupArray
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
        // let datas = groupArray('_id','event_details',result_events)
        // let uniqueEvent_id = []
        // let uniqueEvent = []
        // let matched_events_ids = [];
        // let matched_events = [];
        // for(let i=0; i < datas.length; i++){
        //  // console.log(`${elem._id}- ${elem.timings_day}-${elem.location_name}`)
        //   //uniqueEvent_id.push(datas[i]['_id'])
        //   let timings_day=uniqueFromArr('timings_day', datas[i]['event_details'])
        //   let location_names = uniqueFromArr ('location_name', datas[i]['event_details'])
        //   let dates_arr = await avail_date_filter ({timings_day: timings_day}, context)
        //   let events_result = await context.models.Events.find({_id: result_events})
        //   matched_events.push({timings_day : timings_day, available_dates: dates_arr,location_names: location_names,  events : events_result}) ;
        // }
        // //let uniqueEvent_id=uniqueFromArr('_id', result_events)
        
        // //uniqueEvent_id.forEach((elem_id)=>
        // for(let i=0; i< uniqueEvent_id.length; i++){
        //   //const Events = await context.models.Events.find({_id: ObjectId(uniqueEvent_id[i])}).lean()
        //   matched_events_ids.push([uniqueEvent_id[i]])
        //   console.log('matched_events_ids : . ', matched_events_ids)
        // }
         const events_result = await context.models.Events.find({_id: result_events})
        // matched_events.push({timings_day : timings_day, events : events_result}) ;
        // //matched_events.available_dates = dates_arr;
        // //matched_events.
        return events_result
      } catch (error) {
        console.error("Error : ", error)
        throw new Error (error)
      }
    },
    getEnabledDate: async (parent, args, context, info) => {
      try{
        let result = await avail_date_filter(args, context);
        return result;
      } catch(error) {
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