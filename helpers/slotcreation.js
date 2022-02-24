import moment from 'moment-timezone';
import { ObjectId } from 'bson';
import _ from 'lodash'
import {  
    aggregate_bhf,
    aggregate_bht,
    bushiness_timings_agg,
    get_staffdetail_agg,
    get_staff_dd_locationsettings_agg_bhf,
    get_staff_dd_locationsettings_agg_bht,
    get_event_dd_locationsettings_agg_bhf,
    get_event_dd_locationsettings_agg_bht
  } from '../helpers/aggregateFunctions'

export const getting_slots = async (fromObj,details, models, result, displaySettings, minutesFormat, bookingStartDate, clientSlot, minDate, maxDate, selectedDate, selected_date, dateFormat, pre_booking_day) => {

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
  
    const startDateStr = selectedDate.year() + '-' + (selectedDate.month() + 1) + '-' + selectedDate.date() + 'T' + timingsStartTime.format('HH') + ':' + timingsStartTime.format('mm') + ':' + timingsStartTime.format('sss')
    const endDateStr = selectedDate.year() + '-' + (selectedDate.month() + 1) + '-' + selectedDate.date() + 'T' + timingsEndTime.format('HH') + ':' + timingsEndTime.format('mm') + ':' + timingsEndTime.format('sss')
  
    const selectedStartTime = moment(startDateStr, secondsFormat).format(secondsFormat);
    const selectedEndTime = moment(endDateStr, secondsFormat).format(secondsFormat);
  
    let bookingStartTime = moment(selectedStartTime)
    let bookingEndTime = moment(selectedEndTime)
  
    
  
    let slotCount = 0;
    let slotStartTime = '';
    let slotEndTime = '';
    while (bookingStartTime < bookingEndTime) {
      slotCount++;
      //bookingStartTime = moment.tz(bookingStartTime, "Asia/Kolkata");
      //slotStartTime = moment.tz(bookingStartTime, "Asia/Kolkata").format();
      displaySettings == '12' ? slotStartTime = moment(bookingStartTime, [secondsFormat]).format(secondsFormat) : slotStartTime = bookingStartTime.format(secondsFormat)
      bookingStartTime.add(clientSlot, 'minutes');
      //slotEndTime = moment.tz(bookingStartTime, "Asia/Kolkata").format();
      displaySettings == '12' ? slotEndTime = moment(bookingStartTime, [secondsFormat]).format(secondsFormat) : slotEndTime = timingsStartTime.format(secondsFormat) //.format("hh:mm A")
  //console.log(`${slotStartTime} - ${slotEndTime}`)
      let current_time = moment(new Date(), secondsFormat)
      //const cur_time_seconds = moment.duration(current_time).asSeconds()
      let _slotStartTime = moment(new Date(slotStartTime), secondsFormat) 
      //const slot_start_time_seconds = moment.duration(_slotStartTime).asSeconds()
      if(_slotStartTime<current_time){
        availTimes.push({
          _id: _id,
          slotStartTime: slotStartTime,
          slotEndTime: slotEndTime,
          isBooking: true,
          slot: slotCount
        });
      } else {
        availTimes.push({
          _id: _id,
          slotStartTime: slotStartTime,
          slotEndTime: slotEndTime,
          isBooking: false,
          slot: slotCount
        });
      }
      
    }
    //availTimes = availTimes.splice(availTimes.lengh,1)
    result.locationAvailable = availLocations
    result.availableTimes = availTimes
    result.dayStartTime = dayStartTime.format(dateFormat)
    result.dayEndTime = dayEndTime.format(dateFormat)
  
    return result;
  }
  
  export let compareTwoSlots = (list_one, list_two) => {
    let list_availTimes = [];
    let eventResultCount = 1;
    let events_ar = list_two[0].availableTimes[0]
    let staff_ar = list_one[0].availableTimes[0]
  
    console.log('Event AvailableTimes Count : ', events_ar.length)
    console.log('Staff AvailableTimes Count : ', staff_ar.length)
  
    let matched_slots = [];
  
    for (let q = 0; q < staff_ar.length; q++) {
      let s_start;
      let s_start_sec;
      let e_start
      let e_start_sec
  
      let e_end
      let e_end_sec
  
      let i = 0;
      let j = 0;
        i++;
        
        s_start = moment(new Date(staff_ar[q].slotStartTime), "YYYY-MM-DDTHH:mm:ss")
        s_start_sec = moment.duration(s_start).asSeconds()
          j++;
          
          for (let l = 0; l < events_ar.length; l++) {
            e_start = moment(new Date(events_ar[l].slotStartTime), "YYYY-MM-DDTHH:mm:ss")
            e_start_sec = moment.duration(e_start).asSeconds()
  
            e_end = moment(new Date(events_ar[l].slotEndTime), "YYYY-MM-DDTHH:mm:ss")
            e_end_sec = moment.duration(e_end).asSeconds()
            let e_end_secTo_time = moment(e_end_sec, "YYYY-MM-DDTHH:mm:ss")
  
            if(s_start_sec >= e_start_sec && s_start_sec < e_end_sec){
              matched_slots.push(staff_ar[q].slot)
            }
          }
      eventResultCount++;
    }
    let matched_staff = []
    console.log("Matched Staff slots : ", matched_slots)
    
    // staff_ar = staff_ar.filter(function(st) {
    //   return matched_slots.some(
    //     function(ms) { 
    //     return st.slot === ms; 
    //   });
    // })
    
    
    
    list_availTimes = staff_ar
    return list_availTimes;
  
  }
  
  export let checkBooking = async (list_one, select_date, models, args_staff_ids, args_event_id) => {
    try {
  
      let selectedDate = moment(new Date(select_date), "YYYY-MM-DDTHH:mm:ss").toISOString() //moment.utc('2021-09-29T12:00:14.000+00:00') moment(new Date ('2021-09-29T12:00:00.000+00:00'), "YYYY-MM-DDTHH:mm:sss").toUTCString();
      let selectedDatePlus = moment(new Date(select_date), "YYYY-MM-DDTHH:mm:ss").add(1, 'days').toISOString()
  
     let findObj = {staff_id: ObjectId(args_staff_ids) , event_id: ObjectId(args_event_id[0]) , appointment_start_time: { $gte: new Date(selectedDate), $lte: new Date(selectedDatePlus)  }} //Is_cancelled:false, deleted:false, 
      console.log(`booking find obj : ${JSON.stringify(findObj)}`)
      let bookingDetails = await models.Booking.find(findObj).lean()//appointment_start_time: moment.utc('2021-10-29T01:00:00.000+00:00')  //site_id: args_site_id, workspace_ids: args_workspace_id,
      
      //Staff
      let list_availTimes = [];
      let staff_ar = list_one.availableTimes[0]
  
      console.log('staff_ar.length  : ', staff_ar.length)      
      if(bookingDetails.length > 0 ){        
        for(let j=0; j< bookingDetails.length; j++){
          let du_result = await duration_calc(bookingDetails[j].event_id, models)
          let { buffer_after_min, buffer_before_min, duration_hours, duration_minutes } = du_result
          let du_hours = duration_hours = undefined ? 0 : duration_hours
          let du_miniutes = buffer_after_min = undefined ? 0 : buffer_after_min + (buffer_before_min = undefined ? 0 : buffer_before_min )+  ( duration_minutes  = undefined ? 0 : duration_minutes )
          
          staff_ar = await is_bookingExist(staff_ar, bookingDetails[j],models, du_hours, du_miniutes, 'slot')
          
          
        }
      } else {
        console.log('Booking Not available  : ', bookingDetails)
      }
      
      
    //   for (let q = 0; q < staff_ar.length; q++) {
        
    //     let s_start = moment(new Date(staff_ar[q].slotStartTime))
    //    let s_end = moment(new Date(staff_ar[q].slotEndTime))
    //     let s_start_sec = moment.duration(s_start).asSeconds()
    //     let s_end_sec = moment.duration(s_end).asSeconds()
  
    //     //Booking
    //     //bookingDetails.forEach((e1) => {
    //     for (let l = 0; l < bookingDetails.length; l++) {
  
    //       let dayStartTime = '';
    //       let dayEndTime = '';
        
    //       dayStartTime = moment(new Date(bookingDetails[l].appointment_start_time), "YYYY-MM-DDTHH:mm:ss") //moment.utc(bookingDetails[l].appointment_start_time).format()
    //       const b_start_sec = moment.duration(dayStartTime).asSeconds()
    //       const timingsStartTime = moment(new Date(bookingDetails[l].appointment_start_time), "YYYY-MM-DDTHH:mm:ss")
  
    //       if (b_start_sec == s_start_sec && b_start_sec <= s_end_sec) {
    //         staff_ar[q].isBooking = true
    //         const tindex = bookingDetails.map(e => e.appointment_start_time).indexOf(bookingDetails[l].appointment_start_time);
    //         bookingDetails.splice(tindex, 1)
    //         break;
    //       } else {
    //         //staff_ar[q].isBooking = false
    //       }
  
    //     }
    //   }
      return staff_ar
  
    }  catch (error) {
      console.error("Error : ", error)
      throw new Error (error)
    }
  
  }
  
  export function result(start_date, end_date, pre_booking_day, available_date, disable_date, selectedDate, availableTimes, locationAvailable, dayStartTime, dayEndTime) {
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
  
  export let removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] == value ) ){ 
           arr.splice(i,1);
       }
    }
    return arr;
  }
  
  function recur_ar(staff_ar,matched_slots) {
    //staff_ar.forEach((e)=>{
      if(matched_slots.includes(staff_ar[0].slot)) {
        console.log('Slot match  : ', staff_ar[0].slot)
        staff_ar = removeByAttr(staff_ar, "slot", staff_ar[0].slot)
         //matched_slots = arrayRemove(matched_slots, staff_ar[0].slot);
      } else {
        console.log('Slot not match  : ', staff_ar[0].slot)
        //staff_ar = removeByAttr(staff_ar, "slot", staff_ar[0].slot)
      }
    //})
    
    if(matched_slots.length == 0) {
      return staff_ar;
    }
    recur_ar(staff_ar,matched_slots)
  }
  
  function arrayRemove(arr, value) { 
      
    return arr.filter(function(ele){ 
        return ele != value; 
    });
  }
  
  export let date_check  = async (args,context) => {
    let displaySettings = '12'
    const secondsFormat = "YYYY-MM-DD HH:mm:ss";
    const dateFormat = "YYYY-MM-DD";
    let selectedDate = moment(args.date, dateFormat);
  
    let Setting = await context.models.Setting.find({}).lean() //await context.models.Setting.find({})
    const pre_booking_day = Setting[0].advance_Booking_Period
    const clientSlot = Setting[0].client_time_slot
  
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
  
    let _resp = {
        displaySettings: displaySettings,
        selectedDate: selectedDate.format(dateFormat),
        start_date: minDate.format(dateFormat),
        end_date: maxDate.format(dateFormat),
        pre_booking_day: pre_booking_day,
        clientSlot: clientSlot,
        available_date : available_date,
        disable_date : disable_date
    }
    console.log('_resp : ', _resp)
    return _resp
  }

  export let locations_arr = (loc_ar) => {
    let location_setting = [], locations = [];
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
    return loc
  }
  
  export let getAvailability = async (args, context) => {
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
      events = await context.models.Events.find({ _id: ObjectId(args.event[q])  })
      if(events.length == 0){
        console.error("Event id is not available")
        throw new Error ("Event id is not available")
      }
      if (events[0].business_timings) {
        let event_pipeline = aggregate_bht(args.event[0], 'event')
        events_ag_rs = await context.models.Events.aggregate(event_pipeline);
        console.log('events_ag_rs BHT : ', events_ag_rs.length)
      } else {
        let event_pipeline = aggregate_bhf(args.event[0], 'event')
        events_ag_rs = await context.models.Events.aggregate(event_pipeline);
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
                console.log(`Events ${loc._id}location : ${events_ag_rs[k].location_name}`)
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
  }

  export let is_bookingExist = async (staff_ar, bookingDetails, models, du_hours, du_miniutes, callfrom) => {
    //Booking Hours Calc
    let dayStartTime = '';
    let dayEndHours = '';
    let dayEndTime = '';
  
    dayStartTime = moment(new Date(bookingDetails.appointment_start_time), "YYYY-MM-DDTHH:mm:ss") //moment.utc(bookingDetails.appointment_start_time).format()
    dayEndHours = moment(dayStartTime, "YYYY-MM-DDTHH:mm:ss").add(du_hours, 'hours')
    console.log(`Booking Start Time - ${dayStartTime} : After Hours - ${dayEndHours}`)
    dayEndTime = moment(dayEndHours, "YYYY-MM-DDTHH:mm:ss").add(du_miniutes, 'minutes')
    console.log(`Booking Start Time - ${dayStartTime} : After Minutes - ${dayEndTime}`)
    //let resultduration = await duration_calc(bookingDetails.event_id, models);
    // const b_start_sec = moment.duration(dayStartTime).asSeconds()
    // const b_end_sec = moment.duration(dayEndTime).asSeconds()

    staff_ar = staff_ar.map((elem)=>{
      let s_start = moment(elem.slotStartTime)
      let s_end = moment(elem.slotEndTime)
      if (s_start >= dayStartTime  && s_start <= dayEndTime) {
              
        if(callfrom == 'slot'){
          console.log(`Booking Matched with Slot : ${elem.slotStartTime}`)
          elem.isBooking = true
          // const tindex = bookingDetails.map(e => e.appointment_start_time).indexOf(bookingDetails[l].appointment_start_time);
          // bookingDetails.splice(tindex, 1)
          //break;
        } else {
          console.log(`Booking Matched with Reschedule : ${elem.slotStartTime}`)
          elem.isBooking = false
        }
    } else {
      //elem.isBooking = false
    }
    return elem
    })

    // for (let q = 0; q < staff_ar.length; q++) {
        
    //     let s_start = moment(staff_ar[q].slotStartTime)
    //    let s_end = moment(staff_ar[q].slotEndTime)
    //     let s_start_sec = moment.duration(s_start).asSeconds()
    //     let s_end_sec = moment.duration(s_end).asSeconds()
  
    //     //Booking
    //     //bookingDetails.forEach((e1) => {
    //     //for (let l = 0; l < bookingDetails.length; l++) {
    //       const timingsStartTime = moment(new Date(bookingDetails.appointment_start_time), "YYYY-MM-DDTHH:mm:ss")
    //       console.log(`\n ${moment(dayStartTime).format("YYYY-MM-DDTHH:mm:ss")} - ${moment(dayEndTime).format("YYYY-MM-DDTHH:mm:ss")}`)  
    //       //if (s_start_sec >= b_start_sec  && s_start_sec <= b_end_sec) {
    //         if (s_start >= dayStartTime  && s_start <= dayEndTime) {
              
    //           if(callfrom == 'slot'){
    //             console.log(`Booking Matched with Slot : ${staff_ar[q].slotStartTime}`)
    //             staff_ar[q].isBooking = true
    //             // const tindex = bookingDetails.map(e => e.appointment_start_time).indexOf(bookingDetails[l].appointment_start_time);
    //             // bookingDetails.splice(tindex, 1)
    //             //break;
    //           } else {
    //             console.log(`Booking Matched with Reschedule : ${staff_ar[q].slotStartTime}`)
    //             staff_ar[q].isBooking = false
    //           }
            
    //       } else {
    //         //staff_ar[q].isBooking = false
    //       }
  
    //     //}
    //   }

      return staff_ar
  }

  export let duration_calc = async(event_id, models) => {
    let day_start_end = ''
    let event_data = await models.Events.find({_id: event_id}).lean()
    
    return event_data[0]
  }
  
  export let getStaffLocations = async(args, context) => {
    let staff_loc_ar = [];
      let business_time = await context.models.Staff.aggregate(bushiness_timings_agg(args.staff_id, args.workspace_id,args.site_id, 'staff'));
      if(business_time[0].business_hours){
        staff_loc_ar = await context.models.Staff.aggregate(get_staff_dd_locationsettings_agg_bht(args.staff_id, args.workspace_id,args.site_id));
      } else {
        staff_loc_ar = await context.models.Staff.aggregate(get_staff_dd_locationsettings_agg_bhf(args.staff_id, args.workspace_id,args.site_id));
      }
      if(staff_loc_ar.length<1){
        throw new Error('Location setting not available in staff')
      }
      console.log(`\n getStaffLocations - id : ${args.staff_id} :  , ${staff_loc_ar}`)
      return staff_loc_ar;
  }

  export let getEventLocations = async(args, context) => {
    let event_loc_ar = [];
    let ev_business_time = await context.models.Events.aggregate(bushiness_timings_agg(args.event_id, args.workspace_id,args.site_id, 'event'));
      if(ev_business_time[0].business_hours){
        event_loc_ar = await context.models.Events.aggregate(get_event_dd_locationsettings_agg_bht(args.event_id, args.workspace_id,args.site_id));
      } else {
        event_loc_ar = await context.models.Events.aggregate(get_event_dd_locationsettings_agg_bhf(args.event_id, args.workspace_id,args.site_id));
      }
      if(event_loc_ar.length<1){
        throw new Error('Location setting not available in event')
      }
      console.log(`\n getEventLocations - id : ${args.event_id} :  , ${event_loc_ar}`)
      return event_loc_ar
  }

  export let getServicesbyStaffId = async(args, context) => {
    let staff_loc_ar = await getStaffLocations(args, context)
        let event_loc_ar = [];
        let event_loc_grp = [];
        if(staff_loc_ar.length > 0) {
          if(staff_loc_ar[0].locationsetting.length > 0 ){
            if(staff_loc_ar[0].locationsetting[0].events_id.length > 0 ){
              let events_id = staff_loc_ar[0].locationsetting[0].events_id
              console.log('events_id Before loop : ', events_id)
              for(let i =0; i < events_id.length; i++){
                let event_id = events_id[i]
                console.log('\n event id : ', event_id)
                args = {...args, event_id}
                let events = await getEventLocations(args, context) //getEventLocation group by timings
                console.log('events : ', events)                
                event_loc_ar.push({event_id: event_id, data: events[0].locationsetting} )
                //event_loc_grp.push(groupArray('locationsetting_id','loc_setting',events[0].locationsetting))
                // event_loc_ar.push({id:event_id, loc_details: event_loc_grp})
                // console.log('event_loc_grp : ', event_loc_grp)
                console.log(`event_loc_ar ${i} : , ${event_loc_ar}`)
              }
              console.log('event_loc_ar2 : ', event_loc_ar)
            }
          }
        }
        //event_loc_ar = await getEventLocations(args, context)
      //   let event_results = [];
      //   let stf_loc = [...staff_loc_ar[0].locationsetting]
      //   event_loc_ar.forEach((elem)=>{
      //     if(elem!=undefined){
      //       event_results.push({_id: elem.events_id,  location_name: elem.location_name[0], timings: elem.timings })
      //     }
      //   })
      // let ev_loc = [...event_results]
      // let loc_matched_events = [];
      let matched_events_day = [];
      let matched_events_location = [];
      let matched_events
      if(staff_loc_ar[0].locationsetting.length > 0 && event_loc_ar.length > 0){
        staff_loc_ar[0].locationsetting.forEach((stf_elem)=>{
           event_loc_ar.forEach((el)=>{
            //elem.forEach((el)=>{
              el.data.forEach((ev_data)=>{
                // let matc_locat = ev_data.location_name.map((i) => {
                //   if (stf_elem.location_name.includes(i)) {
                //     return i;
                //   } 
                // });
                //let matc_locat =_.filter(ev_data.location_name, stf_elem.location_name);
                var matc_locat = _.intersectionWith(ev_data.location_name, stf_elem.location_name, _.isEqual);
                //console.log('matc_locat : ', matc_locat)
                matched_events_location.push({_id: el.event_id,  locations: matc_locat})
                if(matc_locat.length > 0){

                let staff_timings = []
                if(stf_elem.timings.timings){ 
                  staff_timings = stf_elem.timings.timings //BH : False
                } else if(stf_elem.timings.timings == undefined && stf_elem.timings.length > 0){
                  staff_timings = stf_elem.timings[0].timings  //BH : True
                }

                  staff_timings.forEach((stf_time) => {
                    ev_data.timings.timings.forEach((ev_time) => {
                        //console.log(`Matched Day  ${stf_elem.location_name} - ${ev_elem.location_name}= Staff : ${stf_time.work_day_name} - Event :  ${ev_time.work_day_name}`)
                        const stf_startDate = moment
                          .duration(string_to_date(stf_time.start_time))
                          .asSeconds();
                         // console.log('seconds to date : ', moment(stf_startDate).format("YYYY-MM-DDTHH:mm:ss"))
                        const ev_startDate = moment
                          .duration(string_to_date(ev_time.start_time))
                          .asSeconds();
                        const ev_endDate = moment
                          .duration(string_to_date(ev_time.end_time))
                          .asSeconds();
              
                        if (stf_startDate <= ev_startDate || stf_startDate <= ev_endDate) {
                          matched_events_day.push({_id: el.event_id,  day: ev_time.work_day_name})
                        }
                    });
                   });
                }
              })     
            //})
          })
          
          // let events_locations = groupArray('_id','location',matched_events_location, 'locations')
          // console.log('events_day', events_locations)
          let events_day = groupArray('_id','timings_day',matched_events_day, 'day')
          matched_events = events_day.map((ev)=>{return ev._id})
          console.log('matched_events', matched_events)
        }) 
      }
      console.log('matched_events : ', matched_events)
      if(matched_events.length == 0){
        console.log('Staff and Event location name does not match')
        throw new Error('Staff and Event location names does not match')
      }
      //console.log(matched_loc)

        return matched_events
  }

export let getLocataion_workDay = async(staff_loc_ar, event_loc_ar)=>{
  let matched_events_day = [];
  let matched_events_location = [];
  let matched_events
  staff_loc_ar.forEach((stf_elem)=>{
    if(event_loc_ar[0].locationsetting){
      event_loc_ar[0]['data'] = event_loc_ar[0].locationsetting
    }
    event_loc_ar.forEach((el)=>{
     //elem.forEach((el)=>{
       el.data.forEach((ev_data)=>{
         let matc_locat = ev_data.location_name.map((i) => {
           if (stf_elem.location_name.includes(i)) {
             return i;
           }
         });
         //console.log('matc_locat : ', matc_locat)
         //matched_events_location.push({_id: ev_data.events_id,  locations: matc_locat})
         if(matc_locat.length > 0){

         let staff_timings = []
         if(stf_elem.timings.timings){ 
           staff_timings = stf_elem.timings.timings //BH : False
         } else if(stf_elem.timings.timings == undefined && stf_elem.timings.length > 0){
           staff_timings = stf_elem.timings[0].timings  //BH : True
         }

           staff_timings.forEach((stf_time) => {
             ev_data.timings.timings.forEach((ev_time) => {
                 //console.log(`Matched Day  ${stf_elem.location_name} - ${ev_elem.location_name}= Staff : ${stf_time.work_day_name} - Event :  ${ev_time.work_day_name}`)
                 const stf_startDate = moment
                   .duration(string_to_date(stf_time.start_time))
                   .asSeconds();
                  // console.log('seconds to date : ', moment(stf_startDate).format("YYYY-MM-DDTHH:mm:ss"))
                 const ev_startDate = moment
                   .duration(string_to_date(ev_time.start_time))
                   .asSeconds();
                 const ev_endDate = moment
                   .duration(string_to_date(ev_time.end_time))
                   .asSeconds();
       
                 if (stf_startDate <= ev_startDate || stf_startDate <= ev_endDate) {
                   matched_events_day.push({_id: ev_data.events_id,  day: ev_time.work_day_name, locations: matc_locat})
                 }
             });
            });
         }
       })     
     //})
   })
   
  //  let events_locations = groupArray('_id','location',matched_events_location, 'locations')
  //  console.log('events_day', events_locations)
   //let events_locations = groupArray('locations','timings_day',matched_events_day,'day')
   //let events_day = groupArray('_id','locations',matched_events_day, 'locations')
   var selected_ids = _.filter(matched_events_day, 'day');
   selected_ids = _.groupBy(matched_events_day, function(item) {
    return item.day;
  });
  selected_ids = _.forEach(selected_ids, function(value, key) {
    selected_ids[key] = _.groupBy(selected_ids[key], function(item) {
      return item.locations;
    });
  });
  console.log('selected_ids : ', selected_ids)
  // let rs = _.forEach(selected_ids, function(value, key) {
  //   selected_ids[key] = _.groupBy(selected_ids[key], function(item) {
  //     return item.modelCode;
  //   });
  // });

  //  matched_events = events_day.map((ev)=>{return ev._id})
  //  console.log('matched_events', matched_events)
   return {selected_ids}
 })
}

  
export let string_to_date = (start_time) => {
  let date_format = "YYYY-MM-DDTHH:mm:ss"
  const timingsStartTime = moment(new Date(start_time), date_format) //.format(hs_format)
  //console.log('timingsStartTime : ', timingsStartTime.format(hs_format))
    let default_date = moment(new Date(0), date_format)
    const newDate = default_date.year() + '-' + (default_date.month() + 1) + '-' + default_date.date() + 'T' + + timingsStartTime.format('HH') + ':' + timingsStartTime.format('mm') + ':' + timingsStartTime.format('ss')
    //console.log('newDate : ', newDate)
    const strDate = moment(newDate, date_format)
    return strDate
}

export let uniqueFromArr = (field,array) => {
  var flags = [], output = [], l = array.length, i;
  for( i=0; i<l; i++) {
    if( flags[array[i][field]]) continue;
      flags[array[i][field]] = true;
      output.push(array[i][field]);
  }
  return output
}

export let avail_date_filter = async (args, context) => {
  const secondsFormat = "YYYY-MM-DDTHH:mm:ss";
    const dateFormat = "YYYY-MM-DD";
    let selectedDate = moment(new Date(), dateFormat).startOf('day');
    let day_names = args.timings_day//["Monday", "Tuesday"]
  
    let Setting = await context.models.Setting.find({}).lean() //await context.models.Setting.find({})
    const pre_booking_day = Setting[0].advance_Booking_Period
  
    let minDate = moment(new Date(), secondsFormat).startOf('day');
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
        if(day_names.includes (new moment(bookStartDate).format('dddd'))){
          available_date.push((bookStartDate).format(dateFormat))
        }
      }
      bookStartDate.add(1, 'days');
    }
      return available_date
}

export let groupArray = (field,content,myArray,elem) => {
  var groups = {};
  for (var i = 0; i < myArray.length; i++) {
    var groupName = myArray[i][field];
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    if(elem != undefined){
      groups[groupName].push(myArray[i][elem]);
    }else{
      groups[groupName].push(myArray[i]);
    }
    
  }
  myArray = [];
  for (var groupName in groups) {
    let newObj = {}
    newObj[field] = groupName;
    newObj[content] = groups[groupName]
    myArray.push(newObj);
  }
  return myArray
};