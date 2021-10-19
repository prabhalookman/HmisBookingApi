import { ObjectId } from 'bson';
import moment from 'moment-timezone';
export default {
  Query: {
    getStaffDetails: async (parent, args, { models }, info) => {
      try {
        let staffDetails = await models.StaffDetails.find({ site_id: args.site_id, workspace_ids: args.workspace_id })
        return staffDetails
      } catch (error) {
        console.error("Error : ", error)
      }
    },
    getAvailabilityByStaff: async (parent, args, { models }, info) => {
      try {
        // let resultObj = {
        //   start_date: "",
        //   end_date: "",
        //   pre_booking_day: 0,
        //   available_date: [],
        //   disable_date: [],
        //   selectedDate: "",
        //   availableTimes: [],
        //   locationAvailable: [],
        //   dayStartTime: "",
        //   dayEndTime:""
        // }
      let staffResult;
      let staff_pipeline = aggregate_str(args.staff_ids, 'staff')
      //console.log(' staff_pipeline : ', staff_pipeline)
      let staffdetail_ag_rs = await models.Staff.aggregate(staff_pipeline);

      //Events
      let event_pipeline = aggregate_str(args.staff_ids, 'event')
      //console.log('event_pipeline : ', event_pipeline)
      let events_ag_rs = await models.Staff.aggregate(event_pipeline);
      console.log('events_ag_rs : ', events_ag_rs.length)

      //2. Business Hours => False
      let displaySettings = '12'
      let minutesFormat = "HH:mm";
      const dateFormat = "YYYY-MM-DD HH:mm:ss";
      let selectedDate = moment(args.date, "YYYY-MM-DD"); //moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD");
      console.log(`selectedDate.isValid() : ${selectedDate.isValid()} : ${selectedDate}`)

      let settings = await models.Setting.find({}) //site_id: args.site_id, workspace_id: args.workspace_id
      const pre_booking_day = settings[0].advance_Booking_Period.value
      const clientSlot = settings[0].client_time_slot
      //console.log("settings-advance_Booking_Period : ", pre_booking_day)

      let minDate = moment(new Date(), dateFormat)
      let bookingStartDate = moment(new Date(), dateFormat)
      let maxDate = moment(new Date(), dateFormat).add(pre_booking_day - 1, 'days');

      console.log('minDate : ', minDate.format(dateFormat));
      console.log('maxDate : ', maxDate.format(dateFormat));

      if (staffdetail_ag_rs) {
        let newRes = new result("", "", 0, [], [], "", [], [], "", "")
        staffResult = await getting_slots(staffdetail_ag_rs[0], models, newRes, displaySettings, minutesFormat, bookingStartDate, clientSlot, minDate, maxDate, selectedDate, args.date, dateFormat, pre_booking_day)
      }
      let newEvents = null;
      let eventList = []
      let eventResult = [];
      
      if (events_ag_rs && events_ag_rs.length > 0) {
        for (let k = 0; k < events_ag_rs.length; k++) {
          console.log("events_ag_rs  id : ", events_ag_rs[k]._id)
          let newRes = new result("", "", 0, [], [], "", [], [], "", "")
          newEvents = await getting_slots(events_ag_rs[k], models, newRes, displaySettings, minutesFormat, bookingStartDate, clientSlot, minDate, maxDate, selectedDate, args.date, dateFormat, pre_booking_day)
          newEvents ? eventResult.push(newEvents) : 0
        }
      }

      let staff_events_availTimes = compareTwoSlots(staffResult, eventResult)

      //console.log('staff_events_availTimes : ', staff_events_availTimes )
      staffResult.availableTimes = staff_events_availTimes
      //console.log('staffResult : ', staffResult.availableTimes )


      return staffResult
      } catch (error) {
        console.error("Error : ", error)
      }
    },
    getstaffdetailbyservice: async (parent, args, { models }, info) => {
      try {
        let staffDetails = await models.StaffDetails.find({ site_id: args.site_id, workspace_id: args.workspace_id, event_ids: args.event_ids })
        return staffDetails
      } catch (error) {
        console.error("Error : ", error)
      }
    }
  },
  StaffDetails: {
    site_id: async (locsetting, args, { models }) => {
      const resultStaffDetails = await locsetting.populate('site_id').execPopulate();
      return resultStaffDetails.site_id
    },
    workspace_id: async (locsetting, args, { models }) => {
      const resultStaffDetails = await locsetting.populate('workspace_id').execPopulate();
      return resultStaffDetails.workspace_id
    },
    business_id: async (locsetting, args, { models }) => {
      const resultStaffDetails = await locsetting.populate('business_id').execPopulate();
      return resultStaffDetails.business_id
    },
    address_ids: async (locsetting, args, { models }) => {
      const resultStaffDetails = await locsetting.populate('address_ids').execPopulate();
      return resultStaffDetails.address_ids
    },
    timing_ids: async (locsetting, args, { models }) => {
      const resultStaffDetails = await locsetting.populate('timing_ids').execPopulate();
      return resultStaffDetails.timing_ids
    },
    sorting_id: async (locsetting, args, { models }) => {
      const resultStaffDetails = await locsetting.populate('sorting_id').execPopulate();
      return resultStaffDetails.sorting_id
    },
    event_ids: async (locsetting, args, { models }) => {
      const resultStaffDetails = await locsetting.populate('event_ids').execPopulate();
      return resultStaffDetails.event_ids
    },
    location_setting_ids: async (locsetting, args, { models }) => {
      const resultStaffDetails = await locsetting.populate('location_setting_ids').execPopulate();
      return resultStaffDetails.location_setting_ids
    }
  }
}
let getting_slots = async (details, models, result, displaySettings, minutesFormat, bookingStartDate, clientSlot, minDate, maxDate, selectedDate, selected_date, dateFormat, pre_booking_day) => {

  let availLocations = [];
  let available_date = [];
  let disable_date = [];
  if (details.business_timings == false) {    

    while (bookingStartDate <= maxDate) {
      if (bookingStartDate.isoWeekday() == 6 || bookingStartDate.isoWeekday() == 7) {
        disable_date.push(new moment(bookingStartDate).format('YYYY-MM-DD'))
      } else {
        available_date.push(new moment(bookingStartDate).format('YYYY-MM-DD'))
      }
      bookingStartDate.add(1, 'days');
    }
    let calculatedSlots = []
    if (details.timings.length > 0) {
      details.timings.forEach((elem) => {
        elem.timings.forEach((e1) => {
          let selectedDayName = moment(new Date(selected_date), "YYYY-MM-DDTHH:mm:ss").format('dddd')
          let timingsStartTimeDay = e1.work_day_name  //moment(new Date(start_time), "YYYY-MM-DDTHH:mm:ss").format('dddd')
          console.log(`Timings Day - ${timingsStartTimeDay}`)
          let slotArguments = {
            result: result,
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
            console.log('Match')

            //console.log(`selected date ${selectedDate} match with start time ${start_time} -> ${timingsStartTimeDay}`)
          } else {
            console.log('NOT Match')
            //console.log(`selected date ${selectedDate} DOES NOT match with start time ${start_time} -> ${timingsStartTimeDay}`)
          }

        })

      }) //Timings ForEach End
    }

    result.start_date = minDate.format('YYYY-MM-DD')
    result.end_date = maxDate.format('YYYY-MM-DD')
    result.pre_booking_day = pre_booking_day
    result.available_date = available_date
    result.disable_date = disable_date
    result.selectedDate = selectedDate.format('YYYY-MM-DD')
    result.displaySettings = displaySettings
    return result;

  } else {

    //Business timings == TRUE    

    while (bookingStartDate <= maxDate) {
      if (bookingStartDate.isoWeekday() == 6 || bookingStartDate.isoWeekday() == 7) {
        disable_date.push(new moment(bookingStartDate).format('YYYY-MM-DD'))
      } else {
        available_date.push(new moment(bookingStartDate).format('YYYY-MM-DD'))
      }
      bookingStartDate.add(1, 'days');
    }

    details.timings[0].timings.forEach((elem) => {
      let selectedDayName = moment(new Date(selected_date), "YYYY-MM-DDTHH:mm:ss").format('dddd')
      let timingsStartTimeDay = elem.work_day_name  //moment(new Date(start_time), "YYYY-MM-DDTHH:mm:ss").format('dddd')
      console.log(`Timings Day - ${timingsStartTimeDay}`)
      let slotArguments = {
        result: result,
        _id: details._id,
        start_time: elem.start_time,
        end_time: elem.end_time,
        clientSlot: clientSlot,
        selectedDate: selectedDate,
        displaySettings: displaySettings,
        dateFormat: dateFormat
      }

      if (selectedDayName == timingsStartTimeDay) {
        let tresult = slots(slotArguments);
        result.availableTimes.push(tresult.availableTimes)
        
        console.log('Match')

        //console.log(`selected date ${selectedDate} match with start time ${start_time} -> ${timingsStartTimeDay}`)
      } else {
        console.log('NOT Match')
        //console.log(`selected date ${selectedDate} DOES NOT match with start time ${start_time} -> ${timingsStartTimeDay}`)
      }

    }) //Timings ForEach End
    result.start_date = minDate.format('YYYY-MM-DD')
    result.end_date = maxDate.format('YYYY-MM-DD')
    result.pre_booking_day = pre_booking_day
    result.available_date = available_date
    result.disable_date = disable_date
    result.selectedDate = selectedDate.format('YYYY-MM-DD')
    result.displaySettings = displaySettings

    return result
  }
}


//result, _id, start_time, end_time, clientSlot, selectedDate, displaySettings, dateFormat
let slots = (params) => {
  let { result, _id, start_time, end_time, clientSlot, selectedDate, displaySettings, dateFormat } = params

  let availTimes = [];
  let dayStartTime = '';
  let dayEndTime = '';
  let availLocations = [];
  let available_date = [];
  let disable_date = []; 

  dayStartTime = moment(new Date(start_time), "YYYY-MM-DDTHH:mm:ss")
  dayEndTime = moment(new Date(end_time), "YYYY-MM-DDTHH:mm:ss")

  const startSeconds = moment.duration(dayStartTime).asSeconds()
  const endSeconds = moment.duration(dayEndTime).asSeconds()

  const timingsStartTime = moment(new Date(start_time), "YYYY-MM-DDTHH:mm:ss")
  const timingsEndTime = moment(new Date(end_time), "YYYY-MM-DDTHH:mm:ss")

  //selectedDate.year(), selectedDate.month(), selectedDate.date(), timingsEndTime.format('hh'), timingsEndTime.format('mm'), timingsEndTime.format('sss')

  const startDateStr = selectedDate.year() + '-' + (selectedDate.month() + 1) + '-' + selectedDate.date() + 'T' + timingsStartTime.format('HH') + ':' + timingsStartTime.format('mm') + ':' + timingsStartTime.format('sss')
  const endDateStr = selectedDate.year() + '-' + (selectedDate.month() + 1) + '-' + selectedDate.date() + 'T' + timingsEndTime.format('HH') + ':' + timingsEndTime.format('mm') + ':' + timingsEndTime.format('sss')

  const selectedStartTime = moment(startDateStr, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DDTHH:mm:ss");
  const selectedEndTime = moment(endDateStr, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DDTHH:mm:ss");

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
    displaySettings == '12' ? slotStartTime = moment(bookingStartTime, ["YYYY-MM-DDTHH:mm"]).format("YYYY-MM-DDTHH:mm") : slotStartTime = bookingStartTime.format(minutesFormat)
    bookingStartTime.add(clientSlot, 'minutes');
    displaySettings == '12' ? slotEndTime = moment(bookingStartTime, ["YYYY-MM-DDTHH:mm"]).format("YYYY-MM-DDTHH:mm") : slotEndTime = timingsStartTime.format(minutesFormat) //.format("hh:mm A")

    availTimes.push({
      _id: _id,
      slotStartTime: slotStartTime,
      slotEndTime: slotEndTime,
      isBooking: true,
      slot: slotCount
    });    
    // const slotEndTimef = moment(slotEndTime, "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DDTHH:mm:ss");
    // const slotEndTimewf = moment(slotEndTime)    

    // if(slotEndTimewf < bookingEndTime){
      
    // }    
  }
  //console.log('availLocations : ', availLocations);
  //console.log('availTimes : ', availTimes);
  result.locationAvailable = availLocations
  result.availableTimes = availTimes
  result.dayStartTime = dayStartTime.format(dateFormat)
  result.dayEndTime = dayEndTime.format(dateFormat)

  return result;
}

let compareTwoSlots =  (list_one, list_two) => {
  let list_availTimes = [];
  let eventResultCount = 1;
  list_two.forEach((events) => {
    let s_start;
    let s_end;
    let s_start_sec;
    let s_end_sec
    let e_start
    let e_end
    let e_start_sec
    let e_end_sec

    //console.log('list_one.availableTimes : ', list_one.availableTimes)
    //console.log('events.availableTimes : ', events.availableTimes)
let i =0;
let j = 0;

    list_one.availableTimes.forEach((staffsAvail) => {
      i++;
      console.log('staffsAvail Loop Count  : ', i)
      s_start = moment(new Date(staffsAvail.slotStartTime), "YYYY-MM-DDTHH:mm:ss")
      s_end = moment(new Date(staffsAvail.slotEndTime), "YYYY-MM-DDTHH:mm:ss")

      s_start_sec = moment.duration(s_start).asSeconds()
      s_end_sec = moment.duration(s_end).asSeconds()

      //console.log(`Staff slotStartTime : ${staffsAvail.slotStartTime} - as seconds ${s_start_sec} `)
      for(let k=0; k < events.availableTimes.length-1; k++){
        j++;
        console.log('events.availableTimes[k] Loop Count  : ', j)

        e_start = moment(new Date(events.availableTimes[k].slotStartTime), "YYYY-MM-DDTHH:mm:ss")
        e_end = moment(new Date(events.availableTimes[k].slotEndTime), "YYYY-MM-DDTHH:mm:ss")

        e_start_sec = moment.duration(e_start).asSeconds()
        e_end_sec = moment.duration(e_end).asSeconds()

        if (s_start_sec == e_start_sec) {
          console.log(`True : Event slotStartTime : ${events.availableTimes[k].slotStartTime} - Staff slotStartTime : ${staffsAvail.slotStartTime} `)
          let comObj = new customSlot(true, staffsAvail.slotEndTime, staffsAvail.slotStartTime, staffsAvail._id);
          list_availTimes.push(comObj)
        } else {
          console.log(`False : Event slotStartTime : ${events.availableTimes[k].slotStartTime} - Staff slotStartTime : ${staffsAvail.slotStartTime} `)
          let comObj = new customSlot(false, staffsAvail.slotEndTime, staffsAvail.slotStartTime, staffsAvail._id);
          list_availTimes.push(comObj)
        }
      }

      // events.availableTimes.forEach((eventsAvail) => {
        
      // })
    })
    console.log('eventResultCount : ', eventResultCount)
    eventResultCount++;
  })
  return list_availTimes;

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

function aggregate_str(_ids, root){
  let match = { }
  let obj = root + "._id"
  match["staff._id"] = ObjectId(_ids)  

  let _root = {}
  _root["staff"] = "$$ROOT"  

 
let pipeline = []
pipeline.push({
  "$project": {      
      "staff": "$$ROOT"
  }
},
{
  "$lookup": {
      "localField": "staff.staff_detail_id",
      "from": "staffdetails",
      "foreignField": "_id",
      "as": "staffdetails"
  }
},
{
  "$unwind": {
      "path": "$staffdetails",
      "preserveNullAndEmptyArrays": false
  }
},
{
  "$lookup": {
      "localField": "staffdetails.events_ids",
      "from": "events",
      "foreignField": "_id",
      "as": "events"
  }
})
if(root === 'staff'){
  pipeline.push({
    "$lookup": {
        "localField": "staffdetails.timing_ids",
        "from": "timings",
        "foreignField": "_id",
        "as": "timings"
    }
  },
  {
    '$unwind': { path: '$staffdetails', preserveNullAndEmptyArrays: false }
  },
  {
    '$lookup': {
      localField: 'staffdetails.business_id',
      from: 'business',
      foreignField: '_id',
      as: 'staffBusiness'
    }
  },
  {
    '$lookup': {
      localField: 'staffBusiness.business_info_ids',
      from: 'businessinfo',
      foreignField: '_id',
      as: 'staffBusinessinfo'
    }
  },
  {
    '$lookup': {
      localField: 'staffBusinessinfo.timing_ids',
      from: 'timings',
      foreignField: '_id',
      as: 'staffBisTiming'
    }
  })
}
if(root === 'event'){
  pipeline.push({
    "$lookup": {
        "localField": "events.timing_ids",
        "from": "timings",
        "foreignField": "_id",
        "as": "timings"
    }
  },
  {
    '$unwind': { path: '$events', preserveNullAndEmptyArrays: false }
  },
  {
    '$lookup': {
      localField: 'events.business_id',
      from: 'business',
      foreignField: '_id',
      as: 'eventsBusiness'
    }
  },
  {
    '$lookup': {
      localField: 'eventsBusiness.business_info_ids',
      from: 'businessinfo',
      foreignField: '_id',
      as: 'eventsBusinessinfo'
    }
  },
  {
    '$lookup': {
      localField: 'eventsBusinessinfo.timing_ids',
      from: 'timings',
      foreignField: '_id',
      as: 'eventsBisTiming'
    }
  }
  )
}

pipeline.push(
  {
    "$lookup": {
        "localField": "timings.location_setting_ids",
        "from": "locationsetting",
        "foreignField": "_id",
        "as": "locationsetting"
    }
},
{
    "$lookup": {
        "localField": "locationsetting.location_id",
        "from": "location",
        "foreignField": "_id",
        "as": "location"
    }
},
{
    "$match": match
})
if(root === 'event'){
  pipeline.push({
    "$project": {
        "_id": "$staff._id",
        "events": "$events._id",
        "business_timings":"$events.business_timings",
        "locationsetting": "$locationsetting",
        "locationstype": "$location.type",
        "timings": "$timings",
        "eventsBizTimings": '$eventsBisTiming'
    }
  })  
}
if(root === 'staff'){
  pipeline.push({
    "$project": {
        "_id": "$staff._id",
        "staff": "$staff",
        "business_timings":"$staffdetails.business_timings",
        "event": "$events._id",
        "locationsetting": "$locationsetting",
        "locationtype": "$location.type",
        "timings": "$timings",
        "staffBizTimings":"$staffBisTiming"
    }
  })  
}

return pipeline
}