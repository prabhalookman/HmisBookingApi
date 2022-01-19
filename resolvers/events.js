import { ObjectId } from 'bson';
import moment from 'moment';
export default {
  Query: {
    getEvents: async (parent, args, context, info) => {
      try {
        let findObj = {workspace_id: ObjectId(args.workspace_id) , site_id: ObjectId(args.site_id) , staff: ObjectId(args.staff_ids) }
        console.log(findObj)
        let event = await context.models.Event.find(findObj)
        //workspace_ids: args.workspace_id, site_id:args.site_id
        return event
      } catch (error) {
        console.error("Error : ", error)
      }
    },
    getAvailabilityByEvents: async (parent, args, context, info) => {
      try {       
        let result = {
          start_date: "",
          end_date: "",
          pre_booking_day: 0,
          available_date: [],
          disable_date: [],
          selectedDate: "",
          availableTimes: [],
          locationAvailable: [],
          dayStartTime: "",
          dayEndTime:""
        }
        let availTimes = [];
        let availLocations = [];
        let available_date = [];
        let disable_date = [];
        let dayStartTime = '';
        let dayEndTime = '';

        //Event
        let event = await context.models.Event.find({ site_id: args.site_id, workspace_id: args.workspace_id, _id: args.event_id })
        console.log("Event  id : ", event[0].timing_ids)

        //StaffDetails
        // let staffdetail = await context.models.StaffDetails.find({ site_id: ObjectId(args.site_id), workspace_ids: ObjectId(args.workspace_id), _id: staff[0].staff_detail_id })
        // console.log("Staff Details id : ", event[0]._id)

        //2. Business Hours => False
        let displaySettings = '12'
        let minutesFormat = "HH:mm";
        const dateFormat = "YYYY-MM-DD HH:mm:ss";
        let selectedDate = moment(args.date, "YYYY-MM-DD").format("YYYY-MM-DD"); //moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD");

        let settings = await context.models.Setting.find({}) //site_id: args.site_id, workspace_id: args.workspace_id
        const pre_booking_day = settings[0].advance_Booking_Period.value
        const clientSlot = settings[0].client_time_slot
        //console.log("settings-advance_Booking_Period : ", pre_booking_day)

        let minDate = moment(new Date(), dateFormat)
        let bookingStartDate = moment(new Date(), dateFormat)
        let maxDate = moment(new Date(), dateFormat).add(pre_booking_day-1, 'days');

        console.log('minDate : ', minDate.format(dateFormat));
        console.log('maxDate : ', maxDate.format(dateFormat));

        if (event[0].business_timings == false) {
          //Timing
          let timingsResult = await context.models.Timing.find({ _id: event[0].timing_ids })
          console.log("timingsResult id: ", timingsResult[0]._id)
          //console.log("timingsResult id stringify: ", JSON.stringify(timingsResult[0]))

          //Locationsettings
          console.log("location_settings id : ", timingsResult[0].location_setting_ids)

          let locationSettingsResult = await context.models.LocationSetting.find({ _id: timingsResult[0].location_setting_ids })
          //console.log("locationSettingsResult id : ", JSON.stringify(locationSettingsResult))
          locationSettingsResult.forEach((elem) => {
            if (elem.inperson.buinsess_address) { availLocations.push({ _id: elem._id, type: "inperson" }) }
            if (elem.oncall.client_will_call) { availLocations.push({ _id: elem._id, type: "oncall" }) }
            if (elem.video) { availLocations.push({ _id: elem._id, type: "video" }) }
          })

          while (bookingStartDate <= maxDate) {
            if (bookingStartDate.isoWeekday() == 6 || bookingStartDate.isoWeekday() == 7) {
              disable_date.push(new moment(bookingStartDate).format('YYYY-MM-DD'))
            } else {
              available_date.push(new moment(bookingStartDate).format('YYYY-MM-DD'))
            }
            bookingStartDate.add(1, 'days');
          }

          /**************** */
          //Test Date address
          // console.log(`moment().toISOString() Default UTC: ${moment().toISOString()}`)
          // console.log(`moment().toISOString(true) : ${moment().toISOString(true)}`)
          // console.log(`moment().format() ISO 8601, no fractional seconds : ${moment().format()}`)
          // console.log(`moment().toObject() : ${moment().toObject()}`)
          // console.log(`moment().toString() : ${moment().toString()}`)

          // moment().toISOString() Default UTC : 2021-09-15T11:05:12.077Z
          // moment().toISOString(true) : 2021-09-15T16:35:12.374+05:30
          // moment().format() : 2021-09-15T16:35:12+05:30
          // moment().toObject() : [object Object]
          // moment().toString() : Wed Sep 15 2021 16:35:13 GMT+0530

          //moment('2010-10-20').isSame('2010-10-20'); // true

          // var contractMoment = moment(new Date(), dateFormat);
          // var start = moment(contractMoment).add(19, 'days');
          // var end = moment(contractMoment).add(51, 'days');        

          timingsResult[0].timings.forEach((elem) => {
            let timingsDay = moment(new Date(elem.start_time), "YYYY-MM-DD").format("YYYY-MM-DD")
              console.log(`moment(new Date(elem.start_time),"YYYY-MM-DD") - ${timingsDay}`)

            if (selectedDate == timingsDay) {
              console.log(`selected date ${selectedDate} match with start time ${elem.start_time} -> ${timingsDay}`)

              console.log(`elem.start_time - ${elem.start_time}`)
              console.log(`new Date(elem.start_time) - ${new Date(elem.start_time)}`)
              
              console.log(`selectedDate - ${selectedDate}`)
              console.log(`new Date() - ${new Date()}`)

              dayStartTime = moment(new Date(elem.start_time), "YYYY-MM-DDTHH:mm:ss")
              dayEndTime = moment(new Date(elem.end_time), "YYYY-MM-DDTHH:mm:ss")

              const timingsStartTime = moment(new Date(elem.start_time), "YYYY-MM-DDTHH:mm:ss")
              const timingsEndTime = moment(new Date(elem.end_time), "YYYY-MM-DDTHH:mm:ss")

              console.log('timingsStartTime : ', timingsStartTime);
              console.log('timingsEndTime : ', timingsEndTime);

              const startEndDiff = timingsEndTime.diff(timingsStartTime, 'minutes')

              //console.log('Minutes Diff : ', startEndDiff + ` - clientSlot : ${clientSlot}`)
              const slotDuration = (startEndDiff) / clientSlot

              let slotCount = 0;
              let time = '';
              while (timingsStartTime <= timingsEndTime) {
                slotCount++;
                displaySettings == '12' ? time = moment(timingsStartTime, ["HH.mm"]).format("hh:mm A") : time = timingsStartTime.format(minutesFormat)
                availTimes.push({
                  _id: timingsResult[0]._id,
                  time: time,
                  isBooking: true
                });

                timingsStartTime.add(slotDuration, 'minutes');
              }
              //console.log('availLocations : ', availLocations);
              //console.log('availTimes : ', availTimes);
              result.locationAvailable = availLocations
          result.availableTimes = availTimes
          result.dayStartTime = dayStartTime.format(dateFormat)
          result.dayEndTime = dayEndTime.format(dateFormat)

            } else {
              console.log(`selected date ${selectedDate} DOES NOT match with start time ${elem.start_time} -> ${timingsDay}`)
            }

          }) //Timings ForEach End
          result.start_date = minDate.format('YYYY-MM-DD')
          result.end_date = maxDate.format('YYYY-MM-DD')
          result.pre_booking_day = pre_booking_day
          result.available_date = available_date
          result.disable_date = disable_date          
          result.selectedDate = selectedDate

          
        }
        //console.log('result : ', result)
        return result
      } catch (error) {
        console.error("Error : ", error)
      }
    },
    getEventsDetailByStaff: async (parent, args, context, info) => {
      try {
        let findObj = {workspace_id: ObjectId(args.workspace_id) , site_id: ObjectId(args.site_id) , staff: ObjectId(args.staff_ids) }
        let staffEvent = await context.models.Event.find(findObj)
        console.log(`staffEvent Count : `, staffEvent.length)
        return staffEvent
      } catch (error) {
        console.error("Error : ", error)
      }
    },
    getLocationByServiceId: async (parent, args, context, info) => {
      try {
        let locationEvents = await context.models.Event.find({  workspace_id: args.workspace_id, site_id:args.site_id, _id:args.event_id })
        return locationEvents        
      } catch (error) {
        console.error("Error : ", error)
      }
    } 
  },
  Event: {
      timing_ids: async (event) => {
          let resultEvent = await event.populate('timing_ids').execPopulate();
          return resultEvent.timing_ids
      },
      workspace_id: async (event) => {
          let resultEvent = await event.populate('workspace_id').execPopulate();
          return resultEvent.workspace_id
      },
      site_id: async (event) => {
          let resultEvent = await event.populate('site_id').execPopulate();
          return resultEvent.site_id
      },
      staff: async (event) => {
        let resultEvent = await event.populate('staff').execPopulate();
        return resultEvent.staff
      },
      location_setting_ids: async (event) => {
        let resultEvent = await event.populate('location_setting_ids').execPopulate();
        return resultEvent.location_setting_ids
    },
    add_on_ids: async (event) => {
      let resultEvent = await event.populate('add_on_ids').execPopulate();
      return resultEvent.add_on_ids
  },
  }
}