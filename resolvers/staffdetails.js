import { ObjectId } from 'bson';
import moment from 'moment';
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
        let result = {}
        let availTimes = [];
        let availLocations = [];
        let available_date = [];
        let disable_date = [];
        
        //Staff
        let staff = await models.Staff.find({ site_id: args.site_id, workspace_ids: args.workspace_id, _id: args.staff_ids })
        console.log("Staff  id : ", staff[0].staff_detail_id)
        
        //StaffDetails
        let staffdetail = await models.StaffDetails.find({site_id: ObjectId(args.site_id), workspace_ids:ObjectId(args.workspace_id), _id: staff[0].staff_detail_id })
        console.log("Staff Details id : ", staffdetail[0]._id)
        
        //2. Business Hours => False
        
        if(staffdetail[0].business_timings == false){
        //Timing
        let timingsResult = await models.Timing.find({ _id: staffdetail[0].timing_ids })
        console.log("timingsResult id: ", timingsResult[0]._id)
        //console.log("timingsResult id stringify: ", JSON.stringify(timingsResult[0]))

        //Locationsettings
        console.log("location_settings id : ", timingsResult[0].location_setting_ids)
        
        let locationSettingsResult = await models.LocationSetting.find({ _id: timingsResult[0].location_setting_ids })
        console.log("locationSettingsResult id : ", JSON.stringify(locationSettingsResult))
       
        let displaySettings = '12'
        let minutesFormat = "HH:mm";
        const dateFormat = "YYYY-MM-DDTHH:mm:ss";
        let selectedDate = moment(new Date(), "YYYY-MM-DD").format("YYYY-MM-DD");        
        
        let settings = await models.Setting.find({}) //site_id: args.site_id, workspace_id: args.workspace_id
        const pre_booking_day = settings[0].advance_Booking_Period.value
        const clientSlot = settings[0].client_time_slot
        //console.log("settings-advance_Booking_Period : ", pre_booking_day)

        let minDate = moment(new Date(), dateFormat)
        let bookingStartDate = moment(new Date(), dateFormat)
        let maxDate = moment(new Date(), dateFormat).add(pre_booking_day, 'days');
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

        console.log('minDate : ', minDate.format(dateFormat));
        console.log('maxDate : ', maxDate.format(dateFormat));

        // var contractMoment = moment(new Date(), dateFormat);
        // var start = moment(contractMoment).add(19, 'days');
        // var end = moment(contractMoment).add(51, 'days');

        
        while(bookingStartDate <= maxDate){
          if(bookingStartDate.isoWeekday()==6 || bookingStartDate.isoWeekday()==7){
            disable_date.push(new moment(bookingStartDate).format('YYYY-MM-DD'))  
          } else {
            available_date.push(new moment(bookingStartDate).format('YYYY-MM-DD'))
          }
          
          bookingStartDate.add(1, 'days'); 
        }
        
        locationSettingsResult.forEach((elem)=>{
          if(elem.inperson.buinsess_address) { availLocations.push({_id:elem._id, type:"inperson"}) }
          if(elem.oncall.client_will_call) { availLocations.push({_id:elem._id, type:"oncall"}) }
          if(elem.video) { availLocations.push({_id:elem._id, type:"video"}) }          
        })

        timingsResult[0].timings.forEach((elem)=>{
        console.log(`elem.start_time - ${elem.start_time}`)  
        console.log(`new Date(elem.start_time) - ${new Date(elem.start_time)}`)
        let timingsDay = moment(new Date(elem.start_time),"YYYY-MM-DD").format("YYYY-MM-DD")
        console.log(`moment(new Date(elem.start_time),"YYYY-MM-DD") - ${timingsDay}`)
        console.log(`selectedDate - ${selectedDate}`)
        console.log(`new Date() - ${new Date()}`)
          
          if(selectedDate == timingsDay){
            console.log(`selected date ${selectedDate} match with start time ${elem.start_time} -> ${timingsDay}`)
          } else {
            console.log(`selected date ${selectedDate} DOES NOT match with start time ${elem.start_time} -> ${timingsDay}`)
          }

          const dayStartTime = moment(new Date(elem.start_time),"YYYY-MM-DDTHH:mm:ss")
          const dayEndTime = moment(new Date(elem.end_time),"YYYY-MM-DDTHH:mm:ss")
          console.log('dayStartTime : ', dayStartTime);
          console.log('dayEndTime : ', dayEndTime);

          const startEndDiff = dayEndTime.diff(dayStartTime, 'minutes')

          //console.log('Minutes Diff : ', startEndDiff + ` - clientSlot : ${clientSlot}`)
          const slotDuration = (startEndDiff) / clientSlot
          
          let slotCount = 0;
          let time = '';
          while(dayStartTime <= dayEndTime){
            slotCount++;
            displaySettings =='12' ? time = moment(dayStartTime, ["HH.mm"]).format("hh:mm A") : time = dayStartTime.format(minutesFormat)
            availTimes.push({
              _id:timingsResult[0]._id,
              time: time,
              isBooking: true
            });
            
            dayStartTime.add(slotDuration, 'minutes');            
          }
          //console.log('availLocations : ', availLocations);
          //console.log('availTimes : ', availTimes);
        })
          result["start_date"] = minDate.format('YYYY-MM-DD')
          result["end_date"] = maxDate.format('YYYY-MM-DD')
          result["pre_booking_day"] = pre_booking_day
          result["available_date"] = available_date
          result["disable_date"] = disable_date
          result["locationAvailable"] = availLocations
          result["availableTimes"] = availTimes
          result["selectedDate"] = selectedDate
        }
        //console.log('result : ', result)
        return result        
      } catch (error) {
        console.error("Error : ", error)
      }
    }  ,
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