
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
        //let staffResult;
        let staffdetail_ag_rs ;
        let events_ag_rs;
        let staffDetails =await models.Staff.aggregate(get_staffdetail_agg(args.staff_ids));

        if(staffDetails.business_timings){
          
          //Staff
          let staff_pipeline = aggregate_bhf(args.staff_ids, 'staff')
          //console.log(' staff_pipeline : ', staff_pipeline)
          staffdetail_ag_rs = await models.Staff.aggregate(staff_pipeline);

          //Events
          let event_pipeline = aggregate_bhf(args.staff_ids, 'event')
          //console.log('event_pipeline : ', event_pipeline)
          events_ag_rs = await models.Staff.aggregate(event_pipeline);
          console.log('events_ag_rs : ', events_ag_rs.length)

        } else {
          //Staff
          let staff_pipeline = aggregate_bhf(args.staff_ids, 'staff')
          //console.log(' staff_pipeline : ', staff_pipeline)
          staffdetail_ag_rs = await models.Staff.aggregate(staff_pipeline);
          console.log('events_ag_rs : ', staffdetail_ag_rs.length)

          //Events
          let event_pipeline = aggregate_bhf(args.staff_ids, 'event')
          //console.log('event_pipeline : ', event_pipeline)
          events_ag_rs = await models.Staff.aggregate(event_pipeline);
          console.log('events_ag_rs : ', events_ag_rs.length)
          
        }

        let displaySettings = '12'
        let minutesFormat = "HH:mm";
        const dateFormat = "YYYY-MM-DD HH:mm:ss";
        let selectedDate = moment(args.date, "YYYY-MM-DD"); //moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD");
        console.log(`selectedDate.isValid() : ${selectedDate.isValid()} : ${selectedDate}`)

        let settings = await models.Setting.find({})
        const pre_booking_day = settings[0].advance_Booking_Period.value
        const clientSlot = settings[0].client_time_slot

        let minDate = moment(new Date(), dateFormat)
        let bookingStartDate = moment(new Date(), dateFormat)
        let maxDate = moment(new Date(), dateFormat).add(pre_booking_day - 1, 'days');

        console.log('minDate : ', minDate.format(dateFormat));
        console.log('maxDate : ', maxDate.format(dateFormat));

        // if (staffdetail_ag_rs) {
        //   let newRes = new result("", "", 0, [], [], "", [], [], "", "")
        //   staffResult = await getting_slots(staffdetail_ag_rs[0], models, newRes, displaySettings, minutesFormat, bookingStartDate, clientSlot, minDate, maxDate, selectedDate, args.date, dateFormat, pre_booking_day)
        // }

        let newStaffs = null;
        let staffList = []
        let staffResult = [];

        if (staffdetail_ag_rs && staffdetail_ag_rs.length > 0) {
          for (let k = 0; k < staffdetail_ag_rs.length; k++) {
            console.log("staffdetail_ag_rs  id : ", staffdetail_ag_rs[k]._id)
            let newRes = new result("", "", 0, [], [], "", [], [], "", "")
            if(staffdetail_ag_rs[k].location_type.includes(args.location)){
              newStaffs = await getting_slots(staffdetail_ag_rs[k], models, newRes, displaySettings, minutesFormat, bookingStartDate, clientSlot, minDate, maxDate, selectedDate, args.date, dateFormat, pre_booking_day)
              newStaffs ? staffResult.push(newStaffs) : 0
            }
          }
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

        staffResult.availableTimes = await checkBooking(staffResult[0], args.date, models)
        //staffResult.availableTimes = compareTwoSlots(staffResult, eventResult)
        // console.log("Final Result : ", staffResult.availableTimes)
        // console.log('staffResult : ', staffResult.availableTimes )

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
  
  let available_date = [];
  let disable_date = [];
  //if (details.business_timings == false || details.business_timings == true) {

    while (bookingStartDate <= maxDate) {
      if (bookingStartDate.isoWeekday() == 6 || bookingStartDate.isoWeekday() == 7) {
        disable_date.push(new moment(bookingStartDate).format('YYYY-MM-DD'))
      } else {
        available_date.push(new moment(bookingStartDate).format('YYYY-MM-DD'))
      }
      bookingStartDate.add(1, 'days');
    }
    
    let locationAvailable = [];

    if (details.timings) {
      //details.timings.forEach((elem) => {        
        details.timings.timings.forEach((e1) => {
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
            console.log('Match')

            //console.log(`selected date ${selectedDate} match with start time ${start_time} -> ${timingsStartTimeDay}`)
          } else {
            console.log('NOT Match')
            //console.log(`selected date ${selectedDate} DOES NOT match with start time ${start_time} -> ${timingsStartTimeDay}`)
          }

        })

      //}) //Timings ForEach End
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

    availTimes.push({
      _id: _id,
      slotStartTime: moment.utc(slotStartTime).format(),
      slotEndTime: moment.utc(slotEndTime).format(),
      isBooking: true,
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
  let staff_ar = list_one.availableTimes[0]

  console.log('events_ar : ', events_ar)
  console.log('staff_ar : ', staff_ar)

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
      console.log('staff_ar[q] Loop Count  : ', i)
      s_start = moment(new Date(staff_ar[q].slotStartTime), "YYYY-MM-DDTHH:mm:ss")
      s_start_sec = moment.duration(s_start).asSeconds()

      //console.log(`Staff slotStartTime : ${staff_ar[q].slotStartTime} - as seconds ${s_start_sec} `)
      for (let k = 0; k < events_ar.length; k++) {
        j++;
        console.log('events.availableTimes[k] Loop Count  : ', j)
        for (let l = 0; l < events_ar[k].length; l++) {
          e_start = moment(new Date(events_ar[k][l].slotStartTime), "YYYY-MM-DDTHH:mm:ss")
          e_start_sec = moment.duration(e_start).asSeconds()

          if (s_start_sec == e_start_sec) {
            console.log(`True : Event slotStartTime : ${events_ar[k][l].slotStartTime} - Staff slotStartTime : ${staff_ar[q].slotStartTime} `)
            staff_ar[q].isBooking = true
            const tindex = events_ar[k].map(e => e.slotStartTime).indexOf(events_ar[k][l].slotStartTime);
            events_ar[k].splice(tindex, 1)
          } else {
            console.log(`False : Event slotStartTime : ${events_ar[k][l].slotStartTime} - Staff slotStartTime : ${staff_ar[q].slotStartTime} `)
            staff_ar[q].isBooking = false
          }
        }
      }
    }
    list_availTimes = staff_ar
    console.log('eventResultCount : ', eventResultCount)
    eventResultCount++;
  }
  return list_availTimes;

}

let checkBooking = async (list_one, select_date, models, args_site_id, args_workspace_id ) => {
  try {

    let selectedDate = moment.utc('2021-09-29') //moment.utc('2021-09-29T12:00:14.000+00:00') moment(new Date ('2021-09-29T12:00:00.000+00:00'), "YYYY-MM-DDTHH:mm:sss").toUTCString();
    console.log(`selectedDate.isValid() : ${selectedDate.isValid()}  : ${selectedDate}`) //

    let bookingDetails = await models.Booking.find({appointment_start_time: {$gte: moment.utc('2021-09-29')}   })//appointment_start_time: moment.utc('2021-10-29T01:00:00.000+00:00')  //site_id: args_site_id, workspace_ids: args_workspace_id,

    //Staff
    let list_availTimes = [];
    let staff_ar = list_one.availableTimes[0]

    // let s_start;
    // let s_end;
    // let s_start_sec;
    // let s_end_sec;
    console.log('staff_ar.length  : ', staff_ar.length)
    for (let q = 0; q < staff_ar.length; q++) {      
       console.log('staff_ar[q] Loop Count  : ', q)
      // console.log('staff_ar[q].slotStartTime  : ', staff_ar[q].slotStartTime)
      // console.log('typeOf  : ', typeof(staff_ar[q].slotStartTime))
      

      let s_start = moment(new Date(staff_ar[q].slotStartTime))      
      //console.log(`s_start :  ${s_start.isValid()} - ${s_start}`)

      let s_end = moment(new Date(staff_ar[q].slotEndTime))
      let s_start_sec = moment.duration(s_start).asSeconds()
      let s_end_sec = moment.duration(s_end).asSeconds()

      //Booking
      bookingDetails.forEach((e1) => {

        let dayStartTime = '';
        let dayEndTime = '';

        dayStartTime = moment(new Date(e1.appointment_start_time), "YYYY-MM-DDTHH:mm:ss") //moment.utc(e1.appointment_start_time).format()
        //let temp = moment(new Date(dayStartTime))

        const b_start_sec = moment.duration(dayStartTime).asSeconds()

        const timingsStartTime = moment(new Date(e1.appointment_start_time), "YYYY-MM-DDTHH:mm:ss")

        console.log(`s_start : ${s_start} - s_start_sec : ${s_start_sec} `)
        console.log(`s_end : ${s_end} - s_end_sec : ${s_end_sec} `)
        console.log(`B dayStartTime : ${dayStartTime} - b_start_sec : ${b_start_sec} - Db - ${e1.appointment_start_time} `)

        if (b_start_sec >= s_start_sec && b_start_sec <= s_end_sec) {
          //console.log(`True : Event slotStartTime : ${b_start_sec} - Staff slotStartTime : ${staff_ar[q].slotStartTime} `)
          staff_ar[q].isBooking = true
          // const tindex = events_ar[k].map(e => e.slotStartTime).indexOf(events_ar[k][l].slotStartTime);
          // events_ar[k].splice(tindex, 1)
        } else {
          //console.log(`False : Event slotStartTime : ${b_start_sec} - Staff slotStartTime : ${staff_ar[q].slotStartTime} `)
          staff_ar[q].isBooking = false
        }

      })
    }
    return staff_ar

  } catch (er) {
    console.log('checkBooking Error : ', er)

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

function aggregate_bhf(_ids, root, bizhours) {
  let match = {}

  match["staff._id"] = ObjectId(_ids)

  let _root = {}
  _root["staff"] = "$$ROOT"


  let pipeline = []
  if (!bizhours) { // Business Hours : False    
    if (root == 'event') {
      match['events.business_timings']  = false
      pipeline.push(
        { '$project': { staff: '$$ROOT' } },
        {
          '$lookup': {
            'localField': 'staff.staff_detail_id',
            'from': 'staffdetails',
            'foreignField': '_id',
            'as': 'staffdetails'
          }
        },
        {
          '$lookup': {
            'localField': 'staffdetails.events_ids',
            'from': 'events',
            'foreignField': '_id',
            'as': 'events'
          }
        },
        {
          '$unwind': { path: '$events', preserveNullAndEmptyArrays: false }
        },
        {
          '$lookup': {
            'localField': 'events.timing_ids',
            'from': 'timings',
            'foreignField': '_id',
            'as': 'timings'
          }
        },
        {
          '$unwind': { path: '$timings', preserveNullAndEmptyArrays: false }
        },
        {
          '$lookup': {
            'localField': 'timings.location_setting_ids',
            'from': 'locationsetting',
            'foreignField': '_id',
            'as': 'locationsetting'
          }
        },
        {
          '$lookup': {
            'localField': 'locationsetting.location_id',
            'from': 'location',
            'foreignField': '_id',
            'as': 'location'
          }
        },
        { '$match': match},
        {
          '$project': {
            timings: '$timings',
            locationsetting_id: '$locationsetting._id',
            location_type: '$location.type',
          }
        })
    } else {      
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
          '$lookup': {
            'localField': 'staffdetails.timing_ids',
            'from': 'timings',
            'foreignField': '_id',
            'as': 'timings'
          }
        },
        {
          '$unwind': { path: '$timings', preserveNullAndEmptyArrays: false }
        },
        {
          '$lookup': {
            'localField': 'timings.location_setting_ids',
            'from': 'locationsetting',
            'foreignField': '_id',
            'as': 'locationsetting'
          }
        },
        {
          '$lookup': {
            'localField': 'locationsetting.location_id',
            'from': 'location',
            'foreignField': '_id',
            'as': 'location'
          }
        },
        { '$match': match },
        {
          '$project': {
            'timings': '$timings',
            'locationsetting_id': '$llocationsetting._id',
            'location_type': '$location.type'
          }
        }
      )
    }
  } else {
    // Business Hours : True    
  }
  //console.log('pipeline : ', pipeline);
  return pipeline
}
function get_staffdetail_agg(_ids) {
  let match = {}

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
    { '$match': match },
    {
      '$project': {        
        'business_timings':'$staffdetails.business_timings'
      }
    })
  
  return pipeline
}