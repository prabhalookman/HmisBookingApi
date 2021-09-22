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

        //Staff
        let staff = await models.Staff.find({ site_id: args.site_id, workspace_ids: args.workspace_id, _id: args.staff_ids })
        console.log("Staff  id : ", staff[0].staff_detail_id)

        //StaffDetails
        let staffdetail = await models.StaffDetails.find({ site_id: ObjectId(args.site_id), workspace_ids: ObjectId(args.workspace_id), _id: staff[0].staff_detail_id })
        console.log("Staff Details id : ", staffdetail[0]._id)

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
        let maxDate = moment(new Date(), dateFormat).add(pre_booking_day-1, 'days');

        console.log('minDate : ', minDate.format(dateFormat));
        console.log('maxDate : ', maxDate.format(dateFormat));

        if (staffdetail[0].business_timings == false) {
          //Timing
          let timingsResult = await models.Timing.find({ _id: staffdetail[0].timing_ids })
          console.log("timingsResult id: ", timingsResult[0]._id)
          //console.log("timingsResult id stringify: ", JSON.stringify(timingsResult[0]))

          //Locationsettings
          console.log("location_settings id : ", timingsResult[0].location_setting_ids)

          let locationSettingsResult = await models.LocationSetting.find({ _id: timingsResult[0].location_setting_ids }).select({ "inperson": 1, "oncall": 1, "video":1})
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
            let selectedDayName = moment(new Date(args.date), "YYYY-MM-DDTHH:mm:ss").format('dddd')
            let timingsStartTimeDay = elem.work_day_name  //moment(new Date(elem.start_time), "YYYY-MM-DDTHH:mm:ss").format('dddd')
              console.log(`Timings Day - ${timingsStartTimeDay}`)

            if (selectedDayName == timingsStartTimeDay) {
              console.log(`selected date ${selectedDate} match with start time ${elem.start_time} -> ${timingsStartTimeDay}`)

              console.log(`elem.start_time - ${elem.start_time}`)
              console.log(`new Date(elem.start_time) - ${new Date(elem.start_time)}`)

              dayStartTime = moment(new Date(elem.start_time), "YYYY-MM-DDTHH:mm:ss")
              dayEndTime = moment(new Date(elem.end_time), "YYYY-MM-DDTHH:mm:ss")

              const startSeconds = moment.duration(dayStartTime).asSeconds()
              const endSeconds = moment.duration(dayEndTime).asSeconds()
              
              const timingsStartTime = moment(new Date(elem.start_time), "YYYY-MM-DDTHH:mm:ss")
              const timingsEndTime = moment(new Date(elem.end_time), "YYYY-MM-DDTHH:mm:ss")              

              //selectedDate.year(), selectedDate.month(), selectedDate.date(), timingsEndTime.format('hh'), timingsEndTime.format('mm'), timingsEndTime.format('sss')
              
              const startDateStr = selectedDate.year()+'-'+(selectedDate.month()+1)+'-'+selectedDate.date()+'T'+timingsStartTime.format('hh')+':'+timingsStartTime.format('mm')+':'+ timingsStartTime.format('sss')
              const endDateStr =selectedDate.year()+'-'+(selectedDate.month()+1)+'-'+selectedDate.date()+'T'+timingsEndTime.format('hh')+':'+timingsEndTime.format('mm')+':'+ timingsEndTime.format('sss')
              const selectedStartTime = moment(startDateStr,"YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DDTHH:mm:ss");
              const selectedEndTime = moment(endDateStr,"YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DDTHH:mm:ss");
             
              const bookingStartTime = moment(selectedStartTime)
              const bookingEndTime = moment(selectedEndTime)
              
              console.log(`moment(new Date(timingsStartTime), "HH:mm:ss") : ${moment(new Date(timingsStartTime), "HH:mm:ss").format('HH:mm:sss')} ` )
              console.log('bookingStartTime : ', bookingStartTime);
              console.log('bookingEndTime : ', bookingEndTime);

              //const startEndDiff = timingsEndTime.diff(timingsStartTime, 'seconds')
              const startEndDiff = endSeconds - startSeconds
              var myMinutes = Math.floor(startEndDiff / 60);

              //console.log('Minutes Diff : ', startEndDiff + ` - clientSlot : ${clientSlot}`)
              const slotDuration = (myMinutes) / clientSlot

              let slotCount = 0;
              let slotStartTime = '';
              let slotEndTime = '';
              while (bookingStartTime  <= bookingEndTime ) {
                slotCount++;
                displaySettings == '12' ? slotStartTime = moment(bookingStartTime, ["YYYY-MM-DDTHH:mm"]).format("YYYY-MM-DDTHH:mm") : slotStartTime = bookingStartTime.format(minutesFormat)                
                bookingStartTime.add(slotDuration, 'minutes');
                displaySettings == '12' ? slotEndTime = moment(bookingStartTime, ["YYYY-MM-DDTHH:mm"]).format("YYYY-MM-DDTHH:mm") : slotEndTime = timingsStartTime.format(minutesFormat) //.format("hh:mm A")
                availTimes.push({
                  _id: timingsResult[0]._id,
                  slotStartTime: slotStartTime,
                  slotEndTime: slotEndTime,
                  isBooking: true,
                  slot : slotCount
                });                
                
              }                      
              //console.log('availLocations : ', availLocations);
              //console.log('availTimes : ', availTimes);
              result.locationAvailable = availLocations
              result.availableTimes = availTimes
              result.dayStartTime = dayStartTime.format(dateFormat)
              result.dayEndTime = dayEndTime.format(dateFormat)
              console.log(`selected date ${selectedDate} match with start time ${elem.start_time} -> ${timingsStartTimeDay}`)
            } else {
              console.log(`selected date ${selectedDate} DOES NOT match with start time ${elem.start_time} -> ${timingsStartTimeDay}`)
            }

          }) //Timings ForEach End
          result.start_date = minDate.format('YYYY-MM-DD')
          result.end_date = maxDate.format('YYYY-MM-DD')
          result.pre_booking_day = pre_booking_day
          result.available_date = available_date
          result.disable_date = disable_date          
          result.selectedDate = selectedDate.format('YYYY-MM-DD')
          result.displaySettings = displaySettings

          
        }
        //console.log('result : ', result)
        return result
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