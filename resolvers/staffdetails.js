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
        
        let staff = await models.Staff.find({ site_id: args.site_id, workspace_ids: args.workspace_id, _id: args.staff_ids })
        console.log("Staff  id : ", staff[0].staff_detail_id)
        
        let staffdetail = await models.StaffDetails.find({site_id: ObjectId(args.site_id), workspace_ids:ObjectId(args.workspace_id), _id: staff[0].staff_detail_id })
        console.log("Staff Details id : ", staffdetail[0]._id)
        if(staffdetail[0].business_timings == false){
        //Timing
        let timingsIds = await models.Timing.find({ _id: staffdetail[0].timing_ids })
        console.log("timingsIds id: ", timingsIds[0]._id)
        console.log("timingsIds id stringify: ", JSON.stringify(timingsIds[0]))
        
        var availTimes = [];
        let type = "HH:mm:ss";
        const dateFormat = "YYYY-MM-DD HH:mm:ss";
        let settings = await models.Setting.find({}) //site_id: args.site_id, workspace_id: args.workspace_id
        const advanceBooking = settings[0].advance_Booking_Period.value
        const clientSlot = settings[0].client_time_slot
        console.log("settings-advance_Booking_Period : ", settings[0].advance_Booking_Period.value)

        const minDate = moment() 
        const maxDate = minDate.add(settings[0].advance_Booking_Period.value, 'days');

        console.log('minDate : ', minDate);
          console.log('maxDate : ', maxDate);

        // while(minDate <= maxDate){
            
        // }
        
        timingsIds[0].timings.forEach((elem)=>{
          
          //let new_end_time = moment( new_enddate).format(type);
          const startTime = moment(elem.start_time).format(dateFormat) //.utc().set({hour:11,minute:00})
          const endTime = moment(elem.end_time).format(dateFormat); //.utc().set({hour:23,minute:59})

          console.log('startTime : ', startTime);
          console.log('endTime : ', endTime);

          const dayStartTime = moment(elem.start_time);
          const dayEndTime = moment(elem.end_time);
          console.log('dayStartTime : ', dayStartTime);
          console.log('dayEndTime : ', dayEndTime);

          console.log('Minutes Diff : ', dayStartTime.diff(dayEndTime, 'minutes'))
          const noOfSlots = dayStartTime.diff(dayEndTime, 'minutes') / clientSlot

          while(startTime <= endTime){
            timeStops.push(new moment(startTime).format('HH:mm'));
            startTime.add(15, 'minutes');
          }
          
          var timeStops = [];

        })

        
        //default moment date and time timezone(local mode)+
        const fromDates = moment();
        const toDates =today.add(settings[0].advance_Booking_Period.value, 'days');
        
        // while(startTime <= endTime){
        //   timeStops.push(new moment(startTime).format('HH:mm'));
        //   startTime.add(15, 'minutes');
        // }
        // let type = "HH:mm:ss";
        // let start_time = moment(startdate).format(type);

        //timingsIds.

        //Locationsettings
        // let locationSettingIds = await models.LocationSetting.find({site_id: ObjectId(args.site_id), workspace_ids:ObjectId(args.workspace_id), _id: staffdetail[0].timing_ids })
        // console.log("timingsIds id : ", locationSettingIds[0]._id)

        //Location
        /*
        type GetDate {
          start_time: String,
          end_time: String,
          acvailable: Boolean,
          locations: [LocationSetting]
          timings: Timing
        }
        */
        
        }
        return staffdetail
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