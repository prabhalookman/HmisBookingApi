import moment from 'moment-timezone';
import { ObjectId } from 'bson';
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
  console.log(`${slotStartTime} - ${slotEndTime}`)
      let current_time = moment(new Date(), secondsFormat)
      const cur_time_seconds = moment.duration(current_time).asSeconds()
      let _slotStartTime = moment(new Date(slotStartTime), secondsFormat) 
      const slot_start_time_seconds = moment.duration(_slotStartTime).asSeconds()
      if(slot_start_time_seconds<cur_time_seconds){
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
    
    staff_ar = staff_ar.filter(function(st) {
      return matched_slots.some(
        function(ms) { 
        return st.slot === ms; 
      });
    })
    
    
    
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
      for (let q = 0; q < staff_ar.length; q++) {
        
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
          const b_start_sec = moment.duration(dayStartTime).asSeconds()
          const timingsStartTime = moment(new Date(bookingDetails[l].appointment_start_time), "YYYY-MM-DDTHH:mm:ss")
  
          if (b_start_sec == s_start_sec && b_start_sec <= s_end_sec) {
            staff_ar[q].isBooking = true
            const tindex = bookingDetails.map(e => e.appointment_start_time).indexOf(bookingDetails[l].appointment_start_time);
            bookingDetails.splice(tindex, 1)
            break;
          } else {
            //staff_ar[q].isBooking = false
          }
  
        }
      }
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
    let minutesFormat = "HH:mm";
    const secondsFormat = "YYYY-MM-DD HH:mm:ss";
    const dateFormat = "YYYY-MM-DD";
    let selectedDate = moment(args.date, dateFormat);
  
    let Setting = await context.models.Setting.aggregate([{"$match": {}}]) //await context.models.Setting.find({})
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
  
  