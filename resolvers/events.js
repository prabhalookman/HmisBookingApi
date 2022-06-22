import { ObjectId } from 'bson';
import moment from 'moment';
import {
  getServicesbyStaffId,
  uniqueFromArr,
  avail_date_filter,
  groupArray,
  getLocataion_workDay,
  getStaffLocations,
  getEventLocations,
  getStaffbyServiceId
} from '../helpers/slotcreation'
import {  
  bushiness_timings_agg,  
  get_event_locationName_bht_agg,  
  get_event_locationName_bhf_agg
} from "../helpers/aggregateFunctions";
export default {
  Query: {
    getEvents: async (parent, args, context, info) => {
      try {
        let findObj = {workspace_id: ObjectId(args.workspace_id) , site_id: ObjectId(args.site_id) , type: args.type }
        console.log(findObj)
        let events = await context.models.Events.find(findObj, {_id:1}).lean()
        //events = events.toJSON()
        let removedId = []
        let befordId = []
        for(let event of events){
          befordId.push(event._id.toString()) 
          args.event_id = event._id
          // if(event._id.toString() == '61e8fc7ca2af59cecc6f19a5'){
          //   console.log('hi', event._id.toString())
          // }
        let loc_details = await getEventLocations_loc_day(args, context)
        if(loc_details.length == 0){
          removedId.push(event._id.toString())
          events = removeByAttr(events,'_id', event._id)
        }
        }
        events = events.map((e)=>ObjectId(e._id))
        events = await context.models.Events.find({_id: {$in:events}})
        
        // console.log('events length : ', events.length)
        // console.log('befordId : ', befordId )
        // console.log('removedId : ', removedId )
        return events
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
        console.error("Error getEventsDetailByStaff : ", error)
        throw new Error (error)
      }
    },
    getStaffToTransfer: async (parent, args, context, info) => {
      try {        
        let result_staffs = [];
        let book_rec = await context.models.Booking.find({_id: ObjectId(args.booking_id) }).lean()
        args.staff_id = book_rec[0].staff_id.toString()
        args.event_id = book_rec[0].event_id.toString()
        
        let bookingDetails = [];
        let bookingExist = false;
        const bk_starttime   = moment(new Date(book_rec[0].appointment_start_time), "YYYY-MM-DDTHH:mm").format("YYYY-MM-DDTHH:mm")//.toISOString() 
        const bk_endtime   = moment(new Date(book_rec[0].appointment_end_time), "YYYY-MM-DDTHH:mm").format("YYYY-MM-DDTHH:mm")//.toISOString() 
        
        let result = await getStaffbyServiceId(args, context)
        result_staffs.push(...result)  
        //console.log('getStaffbyServiceId staffs : ', result_staffs)
        // Remove source staff from result staffs
        const indx = result_staffs.indexOf(args.staff_id.toString())
        if (indx > -1) {
          result_staffs.splice(indx, 1); // 2nd parameter means remove one item only
        } 
        let search_staffs = result_staffs.map((x)=> ObjectId(x))
        //console.log('search_staffs : ', search_staffs);
        //console.log('result_staffs : ', result_staffs);
        //
        //check each avilable staff have any bookins on same timings
        //console.log('8888 : ', JSON.stringify({ staff_id: {$in:search_staffs}, Is_cancelled: false, deleted: false , appointment_start_time:new Date(bk_starttime), appointment_end_time: new Date(bk_endtime) }))
        bookingDetails = await context.models.Booking.find({ staff_id: {$in:search_staffs}, Is_cancelled: false, deleted: false , appointment_start_time:new Date(bk_starttime), workspace_id: args.workspace_id, site_id: args.site_id}) //{$gte:new Date(bk_starttime)}
        let serviceStaffs = await context.models.Events.find({_id: args.event_id}, {_id:0, staff:1}).lean() //

         result_staffs = serviceStaffs[0].staff.filter(item1 => 
          result_staffs.some(item2 => 
            {
              if (item2.toString() == item1.toString()){
                return item2
              }
            }
            ))
            //console.log('result_staffs : ', result_staffs)
            //console.log('bookingDetails : ', bookingDetails)
        bookingDetails.forEach((b_elem)=>{
          console.log(`appointment start time :  ${b_elem.appointment_start_time} - ${b_elem.staff_id.toString()}`);
          let indx = result_staffs.findIndex(r => r.toString() == b_elem.staff_id.toString())
          if (indx > -1) {
            result_staffs.splice(indx, 1); // 2nd parameter means remove one item only
          } 
        })

        if(result_staffs.length == 0 ){
          console.error("Matched staff is not avilable for transer")
          throw new Error ("Matched staff is not avilable for transer")
        }
        const staff_result = await context.models.Staff.find({_id: result_staffs})
        return staff_result

      } catch (error) {
        console.error("Error getStaffToTransfer : ", error)
        throw new Error (error)
      }
    },
    getEnabledDate: async (parent, args, context, info) => {
      try {
        let timings_day = []
        let event_loc_ar = []
        let staff_loc_ar = await getStaffLocations(args, context)
   
    if (staff_loc_ar.length > 0) {
      if (staff_loc_ar[0].locationsetting.length > 0) {
        if (staff_loc_ar[0].locationsetting[0].events_id.length > 0) {
          let event_ids = [];
          staff_loc_ar[0].locationsetting[0].events_id.forEach((el) => {
            event_ids.push(el.toString());
          });
          console.log("getEnabledDate events_id Before loop : ", event_ids);
          if (event_ids.includes(args.event_id)) {
            let events = await getEventLocations(args, context); //getEventLocation group by timings
            console.log("events : ", events);
            event_loc_ar.push({
              event_id: args.event_id,
              data: events[0].locationsetting,
            });
          }
          console.log(`getEnabledDate : , ${event_loc_ar}`);
        }
      }
    }

        timings_day = await getLocataion_workDay(args,context, staff_loc_ar[0].locationsetting, event_loc_ar, 'date_get')
        args.timings_day = timings_day
        //console.log('rsp : '. rsp)
        let matched_loc = []
        let result = await avail_date_filter(args, context);
        if(result.length == 0){
          console.log('There is no available date')
          throw new Error('There is no available date')
        }
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
},
form_id: async (evens, args, context) => {
  let resultEvent = await evens.populate('form_id').execPopulate();
  return resultEvent.form_id
},
}
}
export let removeByAttr = function (arr, attr, value) {
  try {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] == value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export let getEventLocations_loc_day = async (args, context) => {
  try {
    let event_loc_ar = [];
    let business_time = await context.models.Events.aggregate(
      bushiness_timings_agg(
        args.event_id,
        args.workspace_id,
        args.site_id,
        "event"
      )
    );
    if (business_time[0].business_hours) {
      event_loc_ar = await context.models.Events.aggregate(get_event_locationName_bht_agg([ObjectId(args.event_id) ]))
    } else {
      event_loc_ar = await context.models.Events.aggregate(get_event_locationName_bhf_agg([ObjectId(args.event_id) ]))
    }
    // if (event_loc_ar.length < 1) {
    //   throw new Error("Location setting not available in staff");
    // }
    console.log(`\n getEventLocations_loc_day - event id : ${args.event_id} :  , ${event_loc_ar}`);
    return event_loc_ar;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};