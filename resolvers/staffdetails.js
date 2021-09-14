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
        
        //Business Hours => False
        
        if(staffdetail[0].business_timings == false){
        //Timing
        let timingsResult = await models.Timing.find({ _id: staffdetail[0].timing_ids })
        console.log("timingsResult id: ", timingsResult[0]._id)
        //console.log("timingsResult id stringify: ", JSON.stringify(timingsResult[0]))

        //Locationsettings
        let locationSettingsResult = await models.LocationSetting.find({ _id: timingsResult[0].location_setting_ids }) //
        console.log("locationSettingsResult id : ", JSON.stringify(locationSettingsResult))
        
        let minutesFormat = "HH:mm";
        const dateFormat = "YYYY-MM-DDTHH:mm:ss";
        let settings = await models.Setting.find({}) //site_id: args.site_id, workspace_id: args.workspace_id
        const pre_booking_day = settings[0].advance_Booking_Period.value
        const clientSlot = settings[0].client_time_slot
        console.log("settings-advance_Booking_Period : ", pre_booking_day)

        let minDate = moment(new Date(), dateFormat)        
        let maxDate = moment(minDate).add(pre_booking_day, 'days');

        //console.log('minDate : ', minDate.format(dateFormat));
        //console.log('maxDate : ', maxDate.format(dateFormat));

        // var contractMoment = moment(new Date(), dateFormat);
        // var start = moment(contractMoment).add(19, 'days');
        // var end = moment(contractMoment).add(51, 'days');

        
        // console.log('contractMoment : ', contractMoment)
        // console.log('start : ', start.format(dateFormat))
        // console.log('end : ', end.format(dateFormat))

        // while(minDate <= maxDate){
            
        // }
        
        locationSettingsResult.forEach((elem)=>{
          if(elem.inperson.business_address) { availLocations.push({_id:elem._id, type:"inperson"}) }
          if(elem.oncall.client_will_call) { availLocations.push({_id:elem._id, type:"oncall"}) }
          if(elem.video) { availLocations.push({_id:elem._id, type:"video"}) }          
        })

        timingsResult[0].timings.forEach((elem)=>{
          
          //let new_end_time = moment( new_enddate).format(type);
          // const startTime = moment(elem.start_time, dateFormat) //.utc().set({hour:11,minute:00})
          // const endTime = moment(elem.end_time, dateFormat); //.utc().set({hour:23,minute:59})

          // console.log('startTime : ', startTime);
          // console.log('endTime : ', endTime);

          const dayStartTime = moment(elem.start_time);
          const dayEndTime = moment(elem.end_time);
          console.log('dayStartTime : ', dayStartTime);
          console.log('dayEndTime : ', dayEndTime);

          const startEndDiff = moment(elem.end_time).diff(moment(elem.start_time), 'minutes')

          console.log('Minutes Diff : ', startEndDiff + ` - clientSlot : ${clientSlot}`)
          const slotDuration = (startEndDiff) / clientSlot
          
          let slotCount = 0;
          while(dayStartTime <= dayEndTime){
            slotCount++;        
            availTimes.push({
              _id:timingsResult[0]._id,
              time: dayStartTime.format(minutesFormat),
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