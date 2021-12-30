
import { ObjectId } from 'bson';
import moment from 'moment-timezone';
import {  
  aggregate_bhf,
  aggregate_bht,
  get_staffdetail_agg,
  get_locationsettings_agg_bht,
  get_locationsettings_agg_bhf,
  bushiness_timings_agg
} from '../helpers/aggregateFunctions'
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
        let bookingStartDate = moment(new Date(), dateFormat)
        let maxDate = moment(new Date(), dateFormat).add(pre_booking_day - 1, 'days');
        if(selectedDate<minDate){
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

        let newStaffs = null;
        let staffList = []
        let staffResult = [];

        if (staffdetail_ag_rs && staffdetail_ag_rs.length > 0) {
          for (let k = 0; k < staffdetail_ag_rs.length; k++) {
            console.log("staffdetail_ag_rs  id : ", staffdetail_ag_rs[k]._id)
            let newRes = new result("", "", 0, [], [], "", [], [], "", "")
            let location_flag = false
            staffdetail_ag_rs[k].location_name.forEach((stf)=>{
              args.locationName.forEach((loc)=>{
                if(loc == stf){
                  location_flag = true
                }
              })
            })
            if (location_flag) {
              newStaffs = await getting_slots('Staff',staffdetail_ag_rs[k], context, newRes, displaySettings, minutesFormat, bookingStartDate, clientSlot, minDate, maxDate, selectedDate, args.date, dateFormat, pre_booking_day)
              newStaffs ? staffResult.push(newStaffs) : 0
            } else {
              console.error("location_flag not match ")
              throw new Error ("Location Name  not match with staff location ")
            }
          }
        }
        
        let newEvents = null;
        let eventList = []
        let eventResult = [];
        let events_ag_rs = [];

        if (staffDetail_ar[0].events && staffDetail_ar[0].events.length > 0) {
          let is_eventMatched = false;
            staffDetail_ar[0].events.forEach((elem)=>{
              if(args.event[0] == elem.events._id){
                is_eventMatched = true
                staffDetail_ar[0].events = removeByAttr(staffDetail_ar[0].events, 'id', elem.events._id)
              }
            })
            if(is_eventMatched){
              for (let k = 0; k < staffDetail_ar[0].events.length; k++) {
                console.log("staffDetail_ar[0].events  id : ", staffDetail_ar[0].events[k].events._id)
                
                
                  console.log("staffDetail_ar[0] staff id : ", staffDetail_ar[0].events[k]._id)
                  if (staffDetail_ar[0].events[k].event_business_timings) {
      
                    let event_pipeline = aggregate_bht(args.staff_ids, 'event', true,args.event[0])
                    events_ag_rs = await context.models.Staff.aggregate(event_pipeline);
                    console.log('events_ag_rs : ', events_ag_rs.length)
      
                  } else {
      
                    let event_pipeline = aggregate_bhf(args.staff_ids, 'event', false, args.event[0])
                    events_ag_rs = await context.models.Staff.aggregate(event_pipeline);
                    console.log('events_ag_rs : ', events_ag_rs.length)
                  }
      
                  let newRes = new result("", "", 0, [], [], "", [], [], "", "")
                  ///
                  let ev_location_flag = false
                  events_ag_rs[0].location_name.forEach((evt)=>{
                    args.locationName.forEach((loc)=>{
                      if(loc == evt){
                        ev_location_flag = true
                      }
                    })
                  })
                  if (ev_location_flag) {
                    newEvents = await getting_slots('Event',events_ag_rs[0], context, newRes, displaySettings, minutesFormat, bookingStartDate, clientSlot, minDate, maxDate, selectedDate, args.date, dateFormat, pre_booking_day)
                    newEvents ? eventResult.push(newEvents) : 0
                  } else {
                    console.error("ev_location_flag not match ")
                    throw new Error ("Location Name not match with Event location ")
                  }
                  ///
                  // newEvents = await getting_slots('Event',events_ag_rs[0], models, newRes, displaySettings, minutesFormat, bookingStartDate, clientSlot, minDate, maxDate, selectedDate, args.date, dateFormat, pre_booking_day)
                  // newEvents ? eventResult.push(newEvents) : 0
                  break;
              }
            }
            else {
              console.error("Event Id not associated with staff ")
              throw new Error ("Event Id not associated with staff ")
            }
        }


        
        let resp_result = {}
        staffResult.availableTimes = await checkBooking(staffResult[0], args.date, context, args.staff_ids, args.event)
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
        // console.log("Final staffResult : ", staffResult.availableTimes.length)
        // console.log(' Final eventResult: ', eventResult.availableTimes.length )
        if(events_availableTimes.length>0){
          events_availableTimes.forEach(e => {
            e.forEach(e1 => {
              resp_result.availableTimes.push(e1)
            })
            
          })
        }
        //staffResult.availableTimes = eventResult[0].availableTimes[0]

        return resp_result
      } catch (error) {
        console.error("Error : ", error)
        throw new Error (error)
      }
    },
    getStaffLocationSettings: async(parent, args, context, info)=> {
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
      let maxDate = moment(new Date(), secondsFormat).add(pre_booking_day - 1, 'days');
      if(selectedDate<minDate){
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
      
      let business_time = await context.models.Staff.aggregate(bushiness_timings_agg(args.staff_id, args.workspace_id,args.site_id));
      if(business_time){
        loc_ar = await context.models.Staff.aggregate(get_locationsettings_agg_bht(args.staff_id, args.workspace_id,args.site_id));
      } else {
        loc_ar = await context.models.Staff.aggregate(get_locationsettings_agg_bhf(args.staff_id, args.workspace_id,args.site_id));
      }
        
        location_setting = loc_ar[0].locationsetting
        locations = loc_ar[0].location_type
        let loc = [];
        location_setting.forEach((elem)=>{
          let ls_id = elem.locationsetting_id
          locations.forEach((obj)=>{
            if(elem.location_id.toString() == obj.location_id.toString()){
              loc.push({location_setting_id: ls_id, location_name: obj.location_name, location_type: obj.location_type}) 
            }
          })
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
        let staffDetails = await context.models.StaffDetails.find({ site_id: ObjectId(args.site_id), workspace_ids: ObjectId(args.workspace_id), events_ids: ObjectId(args.event_ids)  })
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
    event_ids: async (locsetting, args, context) => {
      const resultStaffDetails = await locsetting.populate('event_ids').execPopulate();
      return resultStaffDetails.event_ids
    },
    location_setting_ids: async (locsetting, args, context) => {
      const resultStaffDetails = await locsetting.populate('location_setting_ids').execPopulate();
      return resultStaffDetails.location_setting_ids
    }
  }
}
let getting_slots = async (fromObj,details, models, result, displaySettings, minutesFormat, bookingStartDate, clientSlot, minDate, maxDate, selectedDate, selected_date, dateFormat, pre_booking_day) => {

  let available_date = [];
  let disable_date = [];
  //if (details.business_timings == false || details.business_timings == true) {
  
  let bookStartDate = moment(bookingStartDate, "YYYY-MM-DD HH:mm:ss")
  while (bookStartDate <= maxDate) {
    if (bookStartDate.isoWeekday() == 6 || bookStartDate.isoWeekday() == 7) {
      disable_date.push(new moment(bookStartDate).format('YYYY-MM-DD'))
    } else {
      available_date.push(new moment(bookStartDate).format('YYYY-MM-DD'))
    }
    bookStartDate.add(1, 'days');
  }

  let locationAvailable = [];
  let timings_loop = []
  if(details.timings.timings){
    timings_loop = details.timings.timings
  } else if(details.timings.timings == undefined && details.timings.length > 0){
    timings_loop = details.timings[0].timings
  }

  let is_matched = false

  if (details.timings) {
    //details.timings.forEach((elem) => {        
      timings_loop.forEach((e1) => {
      let selectedDayName = moment(new Date(selected_date), "YYYY-MM-DDTHH:mm:ss").format('dddd')
      let timingsStartTimeDay = e1.work_day_name  //moment(new Date(start_time), "YYYY-MM-DDTHH:mm:ss").format('dddd')
      console.log(`Timings Day - ${timingsStartTimeDay}`)
      let slotArguments = {
        result: {},
        _id: details._id,
        start_time: e1.start_time,
        end_time: e1.end_time,
        clientSlot: clientSlot,
        selectedDate: selectedDate,
        displaySettings: displaySettings,
        dateFormat: dateFormat
      }

      if (selectedDayName == timingsStartTimeDay) {
        let tresult = slots(slotArguments);
        result.availableTimes.push(tresult.availableTimes)
        is_matched = true
        console.log('Match')
      } else {
        console.log('NOT Match')
      }

    })
  }

  if(is_matched == false){
    console.log(`${fromObj} not available on the selected day`)
    throw new Error (`${fromObj} not available on the selected day`)
  }

  result.start_date = minDate.format('YYYY-MM-DD')
  result.end_date = maxDate.format('YYYY-MM-DD')
  result.pre_booking_day = pre_booking_day
  result.available_date = available_date
  result.disable_date = disable_date
  result.selectedDate = selectedDate.format('YYYY-MM-DD')
  result.displaySettings = displaySettings
  return result;

  //}

}


//result, _id, start_time, end_time, clientSlot, selectedDate, displaySettings, dateFormat
let slots = (params) => {
  let { result, _id, start_time, end_time, clientSlot, selectedDate, displaySettings, dateFormat } = params

  let availTimes = [];
  let dayStartTime = '';
  let dayEndTime = '';
  let availLocations = [];
  let minutesFormat = "YYYY-MM-DDTHH:mm";
  let secondsFormat = "YYYY-MM-DDTHH:mm:ss";

  dayStartTime = moment(new Date(start_time), secondsFormat)
  dayEndTime = moment(new Date(end_time), secondsFormat)

  const startSeconds = moment.duration(dayStartTime).asSeconds()
  const endSeconds = moment.duration(dayEndTime).asSeconds()


  const timingsStartTime = moment(new Date(start_time), secondsFormat)
  const timingsEndTime = moment(new Date(end_time), secondsFormat)

  //selectedDate.year(), selectedDate.month(), selectedDate.date(), timingsEndTime.format('hh'), timingsEndTime.format('mm'), timingsEndTime.format('sss')

  const startDateStr = selectedDate.year() + '-' + (selectedDate.month() + 1) + '-' + selectedDate.date() + 'T' + timingsStartTime.format('HH') + ':' + timingsStartTime.format('mm') + ':' + timingsStartTime.format('sss')
  const endDateStr = selectedDate.year() + '-' + (selectedDate.month() + 1) + '-' + selectedDate.date() + 'T' + timingsEndTime.format('HH') + ':' + timingsEndTime.format('mm') + ':' + timingsEndTime.format('sss')

  const selectedStartTime = moment(startDateStr, secondsFormat).format(secondsFormat);
  const selectedEndTime = moment(endDateStr, secondsFormat).format(secondsFormat);

  const bookingStartTime = moment(selectedStartTime)
  const bookingEndTime = moment(selectedEndTime)

  const startEndDiff = endSeconds - startSeconds
  var myMinutes = Math.floor(startEndDiff / 60);
  
  //console.log('Minutes Diff : ', startEndDiff + ` - clientSlot : ${clientSlot}`)
  const slotDuration = (myMinutes) / clientSlot

  let slotCount = 0;
  let slotStartTime = '';
  let slotEndTime = '';
  while (bookingStartTime <= bookingEndTime) {
    slotCount++;
    displaySettings == '12' ? slotStartTime = moment(bookingStartTime, [secondsFormat]).format(secondsFormat) : slotStartTime = bookingStartTime.format(secondsFormat)
    bookingStartTime.add(clientSlot, 'minutes');
    displaySettings == '12' ? slotEndTime = moment(bookingStartTime, [secondsFormat]).format(secondsFormat) : slotEndTime = timingsStartTime.format(secondsFormat) //.format("hh:mm A")

    //moment.utc(slotStartTime).format(),
    //moment.utc(slotEndTime).format()
    availTimes.push({
      _id: _id,
      slotStartTime: slotStartTime,
      slotEndTime: slotEndTime,
      isBooking: false,
      slot: slotCount
    });
  }
  result.locationAvailable = availLocations
  result.availableTimes = availTimes
  result.dayStartTime = dayStartTime.format(dateFormat)
  result.dayEndTime = dayEndTime.format(dateFormat)

  return result;
}

let compareTwoSlots = (list_one, list_two) => {
  let list_availTimes = [];
  let eventResultCount = 1;
  //list_two.forEach((events) => {
  let events_ar = list_two[0].availableTimes
  let staff_ar = list_one.availableTimes//[0]

  // console.log('events_ar : ', events_ar)
  // console.log('staff_ar : ', staff_ar)

  for (let r = 0; r < events_ar.length; r++) {
    let s_start;
    let s_start_sec;
    let e_start
    let e_start_sec

    let i = 0;
    let j = 0;


    //list_one.availableTimes.forEach((list_one.availableTimes[q]) => {
    for (let q = 0; q < staff_ar.length; q++) {
      i++;
      
      s_start = moment(new Date(staff_ar[q].slotStartTime), "YYYY-MM-DDTHH:mm:ss")
      s_start_sec = moment.duration(s_start).asSeconds()

      //console.log(`Staff slotStartTime : ${staff_ar[q].slotStartTime} - as seconds ${s_start_sec} `)
      for (let k = 0; k < events_ar.length; k++) {
        j++;
        
        for (let l = 0; l < events_ar[k].length; l++) {
          e_start = moment(new Date(events_ar[k][l].slotStartTime), "YYYY-MM-DDTHH:mm:ss")
          e_start_sec = moment.duration(e_start).asSeconds()

          if (s_start_sec == e_start_sec && staff_ar[q].isBooking == true) {
            console.log(`True : Event slotStartTime : ${events_ar[k][l].slotStartTime} - Staff slotStartTime : ${staff_ar[q].slotStartTime} `)
            events_ar[k][l].isBooking = true
            const tindex = staff_ar.map(e => e.slotStartTime).indexOf(staff_ar[q].slotStartTime);
            staff_ar.splice(tindex, 1)
          }
          // else {
          //   console.log(`False : Event slotStartTime : ${events_ar[k][l].slotStartTime} - Staff slotStartTime : ${staff_ar[q].slotStartTime} `)
          //   staff_ar[q].isBooking = false
          // }
        }
      }
    }
    // console.log('staff_ar[q] Loop Count  : ', i)
    // console.log('events.availableTimes[k] Loop Count  : ', j)
    list_availTimes = events_ar
    console.log('eventResultCount : ', eventResultCount)
    eventResultCount++;
  }
  return list_availTimes;

}

let checkBooking = async (list_one, select_date, context, args_staff_ids, args_event_id) => {
  try {

    let selectedDate = moment(new Date(select_date), "YYYY-MM-DDTHH:mm:ss").toISOString() //moment.utc('2021-09-29T12:00:14.000+00:00') moment(new Date ('2021-09-29T12:00:00.000+00:00'), "YYYY-MM-DDTHH:mm:sss").toUTCString();
    let selectedDatePlus = moment(new Date(select_date), "YYYY-MM-DDTHH:mm:ss").add(1, 'days').toISOString()

    //console.log('selectedDate : ', selectedDate)
    //console.log(`selectedDate.isValid() : ${selectedDate.isValid()}  : ${selectedDate.toISOString()}`) // 
    //console.log(`selectedDatePlus.isValid() : ${selectedDatePlus.isValid()}  : ${selectedDatePlus.toISOString()}`) // 

    let bookingDetails = await context.models.Booking.find({staff_id: args_staff_ids, event_id: args_event_id, Is_cancelled:false, deleted:false, appointment_start_time: { $gte: selectedDate, $lte: selectedDatePlus }})//appointment_start_time: moment.utc('2021-10-29T01:00:00.000+00:00')  //site_id: args_site_id, workspace_ids: args_workspace_id,
    //{staff_id: args_staff_ids, event_id: args_event_id, appointment_start_time: { $gte: selectedDate, $lte: selectedDatePlus }}

    //Staff
    let list_availTimes = [];
    let staff_ar = list_one.availableTimes[0]

    // let s_start;
    // let s_end;
    // let s_start_sec;
    // let s_end_sec;
    console.log('staff_ar.length  : ', staff_ar.length)
    for (let q = 0; q < staff_ar.length; q++) {
      //console.log('staff_ar[q] Loop Count  : ', q)
      // console.log('staff_ar[q].slotStartTime  : ', staff_ar[q].slotStartTime)
      // console.log('typeOf  : ', typeof(staff_ar[q].slotStartTime))


      let s_start = moment(new Date(staff_ar[q].slotStartTime))
     let s_end = moment(new Date(staff_ar[q].slotEndTime))
      let s_start_sec = moment.duration(s_start).asSeconds()
      let s_end_sec = moment.duration(s_end).asSeconds()

      //Booking
      //bookingDetails.forEach((e1) => {
      for (let l = 0; l < bookingDetails.length; l++) {

        let dayStartTime = '';
        let dayEndTime = '';
      
        dayStartTime = moment(new Date(bookingDetails[l].appointment_start_time), "YYYY-MM-DDTHH:mm:ss") //moment.utc(bookingDetails[l].appointment_start_time).format()
        //let temp = moment(new Date(dayStartTime))

        const b_start_sec = moment.duration(dayStartTime).asSeconds()

        const timingsStartTime = moment(new Date(bookingDetails[l].appointment_start_time), "YYYY-MM-DDTHH:mm:ss")

        // console.log(`s_start : ${s_start} - s_start_sec : ${s_start_sec} `)
        // console.log(`s_end : ${s_end} - s_end_sec : ${s_end_sec} `)
        // console.log(`B dayStartTime : ${dayStartTime} - b_start_sec : ${b_start_sec} - Db - ${bookingDetails[l].appointment_start_time} `)

        if (b_start_sec == s_start_sec && b_start_sec <= s_end_sec) {
          staff_ar[q].isBooking = true
          const tindex = bookingDetails.map(e => e.appointment_start_time).indexOf(bookingDetails[l].appointment_start_time);
          bookingDetails.splice(tindex, 1)
          break;
        } else {
          staff_ar[q].isBooking = false
        }

      }
    }
    return staff_ar

  }  catch (error) {
    console.error("Error : ", error)
    throw new Error (error)
  }

}

function customSlot(isBooking, slotEndTime, slotStartTime, id) {
  this.isBooking = isBooking;
  this.slotEndTime = slotEndTime;
  this.slotStartTime = slotStartTime;
  this._id = id;
}

function result(start_date, end_date, pre_booking_day, available_date, disable_date, selectedDate, availableTimes, locationAvailable, dayStartTime, dayEndTime) {
  this.start_date = start_date;
  this.end_date = end_date;
  this.pre_booking_day = pre_booking_day;
  this.available_date = available_date;
  this.disable_date = disable_date;
  this.selectedDate = selectedDate;
  this.availableTimes = availableTimes;
  this.locationAvailable = locationAvailable;
  this.dayStartTime = dayStartTime;
  this.dayEndTime = dayEndTime
}

var removeByAttr = function(arr, attr, value){
  var i = arr.length;
  while(i--){
     if( arr[i] 
         && arr[i].events.hasOwnProperty(attr) 
         && (arguments.length > 2 && arr[i].events.toString() == value ) ){ 
         arr.splice(i,1);
     }
  }
  return arr;
}