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
        const bookingData   = moment(new Date(book_rec[0].appointment_start_time), "YYYY-MM-DDTHH:mm:ss").toISOString() 
        
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
        bookingDetails = await context.models.Booking.find({ staff_id: {$in:search_staffs}, Is_cancelled: false, deleted: false , appointment_start_time: new Date(bookingData) }) //
        let serviceStaffs = await context.models.Events.find({_id: args.event_id}, {_id:0, staff:1}).lean() //

         result_staffs = serviceStaffs[0].staff.filter(item1 => 
          result_staffs.some(item2 => 
            {
              
              if (item2.toString() == item1.toString()){
                //console.log('item2 : ', item2.toString())
                //console.log('item1 : ', item1.toString())
                return item2
              }
            }            
            
            ))
        
        //console.log('result_staffs : ', result_staffs);
        
        bookingDetails.forEach((b_elem)=>{
          console.log(`appointment start time :  ${b_elem.appointment_start_time} - ${b_elem.staff_id.toString()}`);          
          const indx = result_staffs.indexOf(b_elem.staff_id.toString())
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