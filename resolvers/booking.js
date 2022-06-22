import { MyError } from '../helpers/helper'
import moment from 'moment-timezone';
import { ObjectId } from 'bson';
import{ getAvailability, is_bookingExist } from '../helpers/slotcreation'
import {staff_multiple_client_limit} from '../helpers/aggregateFunctions'
export default {
  Query: {
    getBooking: async (parent, args, context, info) => {
      try {
        let Booking = await context.models.Booking.find({ workspace_id: args.workspace_id, site_id: args.site_id }).lean()
        return Booking
      } catch (error) {
        console.error("Error : ", error)
        throw new Error(error)
      }
    },
    getBookingById: async (parent, args, context, info) => {
      try {
        let Booking = await context.models.Booking.find({ workspace_id: args.workspace_id, site_id: args.site_id, _id: args.booking_id })
        return Booking
      } catch (error) {
        console.error("Error : ", error)
        throw new Error(error)
      }
    },
    getBookingByStaff: async (parent, args, context, info) => {
      try {
        let findObj = { workspace_id: ObjectId(args.workspace_id) , site_id: ObjectId(args.site_id), staff_id: ObjectId(args.staff_id) }
        let Booking = await context.models.Booking.find(findObj)
        return Booking
      } catch (error) {
        console.error("Error : ", error)
        throw new Error(error)
      }
    },
    getBookingByEvent: async (parent, args, context, info) => {
      try {
        let findObj = { workspace_id: ObjectId(args.workspace_id) , site_id: ObjectId(args.site_id) , event_id: ObjectId(args.event_id)  }
        let Booking = await context.models.Booking.find(findObj)
        return Booking
      } catch (error) {
        console.error("Error : ", error)
        throw new Error(error)
      }
    }
  },
  Mutation: {
    addBooking: async (parent, args, context, info) => {
      try {
        let newBooking = new context.models.Booking();
        let newCustomer = new context.models.Customer();

        let bookingInput = args.input.availablity
        let bookingInputKeys = Object.keys(bookingInput)
        let arg_input = args.input["availablity"]
        let customer_ids = []

        //Customer
        if(args.input.customer!= undefined){
          let customer = args.input.customer
        let customerKeys = Object.keys(customer);
        if (!bookingInputKeys)
          console.log("Error Booking keys")
        let i = 0;
        while (i < customerKeys.length) {
          if (customerKeys[i] in newCustomer) {
            newCustomer[customerKeys[i]] = args.input["customer"][customerKeys[i]]
          }
          i++
        }
        
        let customerResult = await context.models.Customer.find({ email: customer.email })

        if (customerResult.length > 0 && customerResult[0].email) {          
          customer_ids.push(customerResult[0]._id)         
        } else {
          newCustomer = await newCustomer.save();
          customer_ids.push(newCustomer._id)
        }
      }
        //Booking
        if (!bookingInputKeys)
          console.log("Error Booking keys")
        let j = 0;
        while (j < bookingInputKeys.length) {
          if (bookingInputKeys[j] in newBooking) {
            newBooking[bookingInputKeys[j]] = arg_input[bookingInputKeys[j]]
          }
          j++
        }
        if(customer_ids.length > 0 ){
          newBooking.customer_ids = customer_ids
        }
        let secondsFormat = "YYYY-MM-DDTHH:mm:ss";
        let dateonlyFormat = "YYYY-MM-DD";

        let repeat_temp = moment(new Date(newBooking.repeat_upto_date), dateonlyFormat)

        const repeat_date = repeat_temp.year() + '-' + (repeat_temp.month() + 1) + '-' + repeat_temp.date()
        //console.log('repeat_date : ', repeat_date)

        let repeat_upto_date = moment(new Date(repeat_date), secondsFormat).endOf('day')
        //console.log('repeat_upto_date : ', repeat_upto_date)
        const timingsStartTime = moment(new Date(arg_input.appointment_start_time), secondsFormat)
        const timingsEndTime = moment(new Date(arg_input.appointment_end_time), secondsFormat) //arg_input.is_recurring == false ?  : moment(new Date(arg_input.repeat_upto_date), secondsFormat)

        const startDateStr = timingsStartTime.year() + '-' + (timingsStartTime.month() + 1) + '-' + timingsStartTime.date()+ 'T' + timingsStartTime.format('HH') + ':' + timingsStartTime.format('mm') + ':' + timingsStartTime.format('sss')
        const endDateStr = timingsEndTime.year() + '-' + (timingsEndTime.month() + 1) + '-' + timingsEndTime.date()+ 'T' + timingsEndTime.format('HH') + ':' + timingsEndTime.format('mm') + ':' + timingsEndTime.format('sss')

        const selectedStartTime = moment(startDateStr, secondsFormat).format(secondsFormat);
        const selectedEndTime = moment(endDateStr, secondsFormat).format(secondsFormat);

        const bookingStartTime = moment(selectedStartTime, secondsFormat)
        const bookingEndTime = moment(selectedEndTime, secondsFormat)

        const dateFormat = "YYYY-MM-DD HH:mm:ss";
        let current_time = moment(new Date(), secondsFormat);
        
        if(bookingStartTime < current_time){
          console.log('Selected appointment date should be greater than current date');
          throw new Error('Selected appointment date should be greater than current date')
        }

        let available_date = [];
        let disable_date = [];
        
          if (bookingStartTime.isoWeekday() == 6 || bookingStartTime.isoWeekday() == 7) {
            disable_date.push(new moment(bookingStartTime).format('YYYY-MM-DD'))
          } else {
            available_date.push(new moment(bookingStartTime).format('YYYY-MM-DD'))
          }

        let uptoDate = moment(new Date(repeat_upto_date), secondsFormat)

        if (arg_input.is_recurring == true) {
         
          if (arg_input.repeat_on.toLowerCase() == 'daily') {
            newBooking = createAppoint (bookingStartTime ,uptoDate, newBooking, context,disable_date, arg_input,customer_ids, 1)
          } 
          else if (arg_input.repeat_on.toLowerCase() == 'weekly') {
            newBooking = createAppoint (bookingStartTime ,uptoDate, newBooking, context,disable_date, arg_input,customer_ids, 7)

          } else if (arg_input.repeat_on.toLowerCase() == 'monthly') {
            newBooking = createAppoint (bookingStartTime ,uptoDate, newBooking, context,disable_date, arg_input,customer_ids, 30)
          }
        } else {
          const checkbook = await checkBook(context, arg_input.staff_id, arg_input.event_id, arg_input.appointment_start_time, arg_input.appointment_end_time,  arg_input.workspace_id, arg_input.site_id)
          if (checkbook) {
            throw new Error(`Booking not available in this slot ${arg_input.appointment_start_time}, please select another slot`)
          }
          if(disable_date.includes(moment(arg_input.appointment_start_time).format('YYYY-MM-DD'))){
            throw new Error(`Can not book in this disabled day ${arg_input.appointment_start_time}, please select another slot`)
          }
          newBooking.progress.push({status:'Booked'})
          newBooking.created_by = arg_input.staff_id
          newBooking = await newBooking.save();

          //update staff           
          let updateObj = { $push: {} };
          updateObj.$push['appointment_booking_ids'] = ObjectId(newBooking._id) ;
          const resultStaffs = await context.models.Staff.find({ _id: newBooking.staff_id },{staff_detail_id:1});
          //console.log('update : ', JSON.stringify(updateObj))
          const resultStaffDetails = await context.models.StaffDetails.findOneAndUpdate({ _id: resultStaffs[0].staff_detail_id }, updateObj, { new: true });
          if(resultStaffDetails){
            //console.log('staff updated')
          } else {
            const deletedBooking = await context.models.Booking.deleteOne({ _id: newBooking._id });
            console.error("Booking Error : Booking not successful : ", newBooking._id)
            throw new Error('Booking Error : Booking not successful')
          }
        }
        return newBooking
      } catch (error) {
        console.error("Error : ", error)
        throw new Error(error)
      }

    },
    rescheduleBooking: async (parent, args, context, info) =>{
      try {
        let findObj = { _id: ObjectId(args.appointment_id), Is_cancelled:false, deleted:false  } //, workspace_id: ObjectId(args.workspace_id) , site_id: ObjectId(args.site_id) , 
        //console.log(`booking find obj : ${JSON.stringify(findObj)}`)
        let bookingDetails = await context.models.Booking.find(findObj).lean()
        if(bookingDetails.length == 0){
          console.error("Error : appointment does not exist ")
          throw new Error ("Appointment does not exist")
        }
        //console.log('book start  : ', moment(bookingDetails[0].appointment_start_time).format())
        let db_start_time = moment(bookingDetails[0].appointment_start_time).format()
        let arg_start_time = moment(args.appointment_start_time).format()
        if(db_start_time === arg_start_time){
          console.error("Already appointment time and new time are same")
          throw new Error ("Already appointment time and new time are same")
        }
        let updateObj = { $set: {} };
        for (var param in args) {
          if(param != 'appointment_id') {
            updateObj.$set[param] = args[param];
          }
          
        }
        updateObj.$set["appointment_time_before_reschedule"] = db_start_time
        const resultBooking = await context.models.Booking.findOneAndUpdate({ _id: ObjectId(args.appointment_id) }, updateObj, { new: true });

        //console.log("resultBooking created : ", resultBooking)

        return resultBooking

        // let available_result = await getAvailability(args, context)
        // let resp_result = await is_bookingExist(available_result.availableTimes, bookingDetails, 'reschedule')
        // available_result.availableTimes = resp_result
        // return available_result;
      } catch (error) {
        console.error("Error : ", error)
        throw new Error (error)
      }
    } 
  },
  Booking: {
    event_id: async (booking) => {
      let resultBooking = await booking.populate('event_id').execPopulate();
      return resultBooking.event_id
    },
    customer_ids: async (booking) => {
      let resultBooking = await booking.populate('customer_ids').execPopulate();
      return resultBooking.customer_ids
    },
    site_id: async (booking) => {
      let resultBooking = await booking.populate('site_id').execPopulate();
      return resultBooking.site_id
    },
    add_on_ids: async (booking) => {
      let resultBooking = await booking.populate('add_on_ids').execPopulate();
      return resultBooking.add_on_ids
    },
    staff_id: async (booking) => {
      let resultBooking = await booking.populate('staff_id').execPopulate();
      return resultBooking.staff_id
    },
    workspace_id: async (booking) => {
      let resultBooking = await booking.populate('workspace_id').execPopulate();
      return resultBooking.workspace_id
    },
    created_by: async (booking) => {
      let resultBooking = await booking.populate('created_by').execPopulate();
      return resultBooking.created_by
    },
    location_setting_id: async (booking) => {
      let resultBooking = await booking.populate('location_setting_id').execPopulate();
      return resultBooking.location_setting_id
    },
    answer_id: async (booking) => {
      let resultBooking = await booking.populate('answer_id').execPopulate();
      return resultBooking.answer_id
    }

  }
}

let createAppoint = async (recurring_start_date ,recurring_end_date,newBooking, context, disable_date, input, customer_ids, days_count) =>{
  let newBook = new context.models.Booking();
  let totalBookings = []
  let i = 0;
  let res = {};
  let secondsFormat = "YYYY-MM-DDTHH:mm:ss";
  let arg_appointment_start_time = moment(input.appointment_start_time, secondsFormat).format(secondsFormat)
  let arg_appointment_end_time = moment(input.appointment_end_time, secondsFormat).format(secondsFormat)
  let arg_appointment_booking_time = moment(input.appointment_booking_time, secondsFormat).format(secondsFormat)
  let current_time = moment(new Date(), secondsFormat);
  if(recurring_start_date < current_time){
    console.log('Selected appointment date should be greater than current date');
    throw new Error('Selected appointment date should be greater than current date')
  }

  while (recurring_start_date <= recurring_end_date) {

    if (i == 0) {
      res = dateCreate(input.appointment_start_time, input.appointment_end_time)
      newBooking.appointment_start_time = arg_appointment_start_time
      newBooking.appointment_end_time = arg_appointment_end_time
      newBooking.appointment_booking_time = moment(new Date(), secondsFormat)
      newBooking.Is_cancelled = false      
      newBooking.deleted = false
      const checkbook = await checkBook(context, input.staff_id, input.event_id, input.appointment_start_time, input.workspace_id, input.site_id)
      
      if (checkbook) {
        throw new Error(`Booking not available in this slot ${arg_appointment_start_time}, please select another slot`)
      }
      if(disable_date.includes(moment(arg_appointment_start_time).format('YYYY-MM-DD'))){
        throw new Error(`Can not book in this disabled day ${arg_appointment_start_time}, please select another slot`)
      }
      newBooking = await newBooking.save();
      //console.log('i ' + i + ' - ' + newBooking._id)
      totalBookings.push(newBooking)
    } else {
      res = dateCreate(res.bookingStartTime.add(days_count, 'days'), res.bookingEndTime.add(days_count, 'days'))
      const checkbook = await checkBook(context, input.staff_id, input.event_id, res.bookingStartTime)
      
      if (checkbook) {
        throw new Error(`Booking not available in this slot ${res.bookingStartTime}, please select another slot`)
      }
      if(disable_date.includes(moment(arg_appointment_start_time).format('YYYY-MM-DD'))){
        throw new Error(`Can not book in this disabled day ${arg_appointment_start_time}, please select another slot`)
      }
      newBooking = new context.models.Booking();
      input.appointment_start_time = res.bookingStartTime
      input.appointment_end_time = res.bookingEndTime
      input.appointment_booking_time = moment(input.appointment_booking_time, secondsFormat).format(secondsFormat)

      for(let key in input){
        newBooking[key] = input[key]
      }
      newBooking.Is_cancelled = false
      newBooking.deleted = false      
      newBooking.created_by = input.created_by
      newBooking.customer_ids = customer_ids
      
      //console.log('newBooking Repeat ', newBooking)
      newBooking = await newBooking.save();
      totalBookings.push(newBooking)
      
    }
    recurring_start_date.add(days_count, 'days');
    // console.log('recurring_start_date : ', recurring_start_date)
    // console.log('recurring_end_date : ', recurring_end_date)
    
    i++
  }
  console.log('totalBookings : ', totalBookings.length)
  return totalBookings[0]
}

let dateCreate = (start_time, end_time) => {
  try {
    let secondsFormat = "YYYY-MM-DDTHH:mm:ss";
    const timingsStartTime = moment(new Date(start_time), secondsFormat)
    const timingsEndTime = moment(new Date(end_time), secondsFormat)

    //selectedDate.year(), selectedDate.month(), selectedDate.date(), timingsEndTime.format('hh'), timingsEndTime.format('mm'), timingsEndTime.format('sss')

    const startDateStr = timingsStartTime.year() + '-' + (timingsStartTime.month() + 1) + '-' + timingsStartTime.date() + 'T' + timingsStartTime.format('HH') + ':' + timingsStartTime.format('mm') + ':' + timingsStartTime.format('sss')
    const endDateStr = timingsEndTime.year() + '-' + (timingsEndTime.month() + 1) + '-' + timingsEndTime.date() + 'T' + timingsEndTime.format('HH') + ':' + timingsEndTime.format('mm') + ':' + timingsEndTime.format('sss')

    const selectedStartTime = moment(startDateStr, secondsFormat).format(secondsFormat);
    const selectedEndTime = moment(endDateStr, secondsFormat).format(secondsFormat);

    const bookingStartTime = moment(selectedStartTime)
    const bookingEndTime = moment(selectedEndTime)

    return { bookingStartTime: bookingStartTime, bookingEndTime: bookingEndTime }

  } catch (error) {
    throw new Error(error)
  }

}

let checkBook = async (context, staffid, eventid,  appointmentstarttime, appointmentendtime, workspace_id, site_id) => {
  try {
    let bookingDetails = [];
    const bookdate   = moment(new Date(appointmentstarttime), "YYYY-MM-DDTHH:mm:ss").toISOString() 
    //console.log('bookdate : ', bookdate);
    bookingDetails = await context.models.Booking.find({ staff_id: staffid, event_id: eventid, Is_cancelled: false, deleted: false, appointment_start_time: new Date(bookdate), workspace_id:workspace_id, site_id:site_id  }).lean()
    
    let startday = moment(new Date(appointmentstarttime)).startOf("day");
    let endday = moment(new Date(appointmentendtime)).endOf("day");

    let bookingCounts = await context.models.Booking.aggregate(
      staff_multiple_client_limit(
        staffid, eventid, startday, endday, workspace_id, site_id
      )
    );

    console.log('bookingCounts : ', bookingCounts)
    let is_multiple_client = null;
    if(bookingCounts && bookingCounts.length > 0){
      is_multiple_client = bookingCounts[0].staff_multiple_client[0]
    }
    //console.log('bookingDetails length: ', bookingDetails.length );
    if (bookingDetails.length > 0 && is_multiple_client == false) {
      return true
    } else {
      return false
    }
  } catch (error) {
    throw new Error(error)
  }
}