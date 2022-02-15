import { MyError } from '../helpers/helper'
import moment from 'moment-timezone';
import { ObjectId } from 'bson';
import{ getAvailability, is_bookingExist } from '../helpers/slotcreation'
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
          console.log("Customer already exist")
          customer_ids.push(customerResult[0]._id)
          // try {
          //   let updateObj = { $set: {} };
          //   for (var param in bookingInput) {
          //     updateObj.$set[param] = bookingInput[param];
          //   }
          //   newBooking = await context.models.Booking.findOneAndUpdate({ customer_ids: customerResult[0]._id }, updateObj, { new: true });    
          //   console.log("Booking updated : ", newBooking)

          // } catch (error) {
          //   console.error("Error : ", error)
          // }

          //throw new Error("Customer already exist")          
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
        
        //let repeat_upto_date = moment(new Date(newBooking.repeat_upto_date), "YYYY-MM-DDTHH:mm:ss").toISOString()
        const timingsStartTime = moment(new Date(arg_input.appointment_start_time), secondsFormat)
        const timingsEndTime = moment(new Date(arg_input.appointment_end_time), secondsFormat) //arg_input.is_recurring == false ?  : moment(new Date(arg_input.repeat_upto_date), secondsFormat)

        const startDateStr = timingsStartTime.year() + '-' + (timingsStartTime.month() + 1) + '-' + timingsStartTime.date()+ 'T' + timingsStartTime.format('HH') + ':' + timingsStartTime.format('mm') + ':' + timingsStartTime.format('sss')
        const endDateStr = timingsEndTime.year() + '-' + (timingsEndTime.month() + 1) + '-' + timingsEndTime.date()+ 'T' + timingsEndTime.format('HH') + ':' + timingsEndTime.format('mm') + ':' + timingsEndTime.format('sss')

        const selectedStartTime = moment(startDateStr, secondsFormat).format(secondsFormat);
        const selectedEndTime = moment(endDateStr, secondsFormat).format(secondsFormat);

        const bookingStartTime = moment(selectedStartTime, secondsFormat)
        const bookingEndTime = moment(selectedEndTime, secondsFormat)

        //console.log('bookingStartTime : ', bookingStartTime)
        //console.log('bookingEndTime : ', bookingEndTime)
        const dateFormat = "YYYY-MM-DD HH:mm:ss";

        let available_date = [];
        let disable_date = [];

        // let b_start_sec = moment.duration(bookStartDate).asSeconds()
        // let max_date_sec = moment.duration(maxDate).asSeconds()

        
          if (bookingStartTime.isoWeekday() == 6 || bookingStartTime.isoWeekday() == 7) {
            disable_date.push(new moment(bookingStartTime).format('YYYY-MM-DD'))
          } else {
            available_date.push(new moment(bookingStartTime).format('YYYY-MM-DD'))
          }

        console.log('disable_date : ', disable_date)
        console.log('available_date : ', available_date)

        if (arg_input.is_recurring == true) {
         
          if (arg_input.repeat_on == 'Daily') {
            newBooking = createAppoint (bookingStartTime ,bookingEndTime, newBooking, context,disable_date, arg_input, 1)
          } 
          else if (arg_input.repeat_on == 'Weekly') {
            newBooking = createAppoint (bookingStartTime ,bookingEndTime, newBooking, context,disable_date, arg_input, 7)

          } else if (arg_input.repeat_on == 'Monthly') {
            newBooking = createAppoint (bookingStartTime ,bookingEndTime, newBooking, context,disable_date, arg_input, 30)
          }
        } else {
          const checkbook = await checkBook(context, arg_input.staff_id, arg_input.event_id, arg_input.appointment_start_time)
          if (checkbook) {
            throw new Error(`Booking not available in this slot ${arg_input.appointment_start_time}, please select another slot`)
          }
          if(disable_date.includes(moment(arg_input.appointment_start_time).format('YYYY-MM-DD'))){
            throw new Error(`Can not book in this disabled day ${arg_input.appointment_start_time}, please select another slot`)
          }
          newBooking.progress.push({status:'Booked'})
          newBooking.created_by = arg_input.staff_id
          newBooking = await newBooking.save();
        }
        //console.log('newBooking', newBooking)

        return newBooking
      } catch (error) {
        console.error("Error : ", error)
        throw new Error(error)
      }

    },
    rescheduleBooking: async (parent, args, context, info) =>{
      try {
        let findObj = { _id: ObjectId(args.appointment_id), Is_cancelled:false, deleted:false  } //, workspace_id: ObjectId(args.workspace_id) , site_id: ObjectId(args.site_id) , 
        console.log(`booking find obj : ${JSON.stringify(findObj)}`)
        let bookingDetails = await context.models.Booking.find(findObj).lean()
        if(bookingDetails.length == 0){
          console.error("Error : appointment does not exist ")
          throw new Error ("Appointment does not exist")
        }
        console.log('book start  : ', moment(bookingDetails[0].appointment_start_time).format())
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

        console.log("resultBooking created : ", resultBooking)

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

  }
}

let createAppoint = async (recurring_start_date ,recurring_end_date,newBooking, context, disable_date, input, days_count) =>{
  let i = 0;
  let res = {};
  let secondsFormat = "YYYY-MM-DDTHH:mm:ss";
  let arg_appointment_start_time = moment(input.appointment_start_time, secondsFormat).format(secondsFormat)
  let arg_appointment_end_time = moment(input.appointment_end_time, secondsFormat).format(secondsFormat)
  let arg_appointment_booking_time = moment(input.appointment_booking_time, secondsFormat).format(secondsFormat)

  while (recurring_start_date <= recurring_end_date) {

    if (i == 0) {
      res = dateCreate(input.appointment_start_time, input.appointment_end_time)
      newBooking.appointment_start_time = arg_appointment_start_time
      newBooking.appointment_end_time = arg_appointment_end_time
      newBooking.appointment_booking_time = arg_appointment_booking_time
      newBooking.Is_cancelled = false
      newBooking.deleted = false
      const checkbook = await checkBook(context, input.staff_id, input.event_id, input.appointment_start_time)
      
      if (checkbook) {
        throw new Error(`Booking not available in this slot ${arg_appointment_start_time}, please select another slot`)
      }
      if(disable_date.includes(moment(arg_appointment_start_time).format('YYYY-MM-DD'))){
        throw new Error(`Can not book in this disabled day ${arg_appointment_start_time}, please select another slot`)
      }
      newBooking = await newBooking.save();
      console.log('i ' + i + ' - ' + newBooking._id)
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
      newBooking.appointment_start_time = res.bookingStartTime
      newBooking.appointment_end_time = res.bookingEndTime
      newBooking.appointment_booking_time = arg_appointment_booking_time
      newBooking.event_id = input.event_id
      newBooking.staff_id = input.staff_id
      newBooking.site_id = input.site_id
      newBooking.workspace_id = input.workspace_id
      newBooking.is_recurring = input.is_recurring
      newBooking.Is_cancelled = false
      newBooking.deleted = false
      newBooking = await newBooking.save();
      console.log('i ' + i + ' - ' + newBooking._id)
    }
    recurring_start_date.add(days_count, 'days');
    i++
  }
  return newBooking
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

let checkBook = async (context, staffid, eventid,  appointmentstarttime) => {
  try {
    let bookingDetails = [];
    const bookdate   = moment(new Date(appointmentstarttime), "YYYY-MM-DDTHH:mm:ss").toISOString() 
    console.log('bookdate : ', bookdate);
    bookingDetails = await context.models.Booking.find({ staff_id: staffid, event_id: eventid, Is_cancelled: false, deleted: false, appointment_start_time: new Date(bookdate)  })
    console.log('bookingDetails length: ', bookingDetails.length );
    if (bookingDetails.length > 0) {
      return true
    } else {
      return false
    }
  } catch (error) {
    throw new Error(error)
  }
}

/*
guest_ids: async (booking) => {
      let resultBooking = await booking.populate('guest_ids').execPopulate();
      return resultBooking.guest_ids
    },
 */
/*
,
    updateBooking: async (parent, args, context, info) => {
      try {
        let updateObj = { $set: {} };
        for (var param in args.input) {
          updateObj.$set[param] = args.input[param];
        }
        const resultBooking = await context.models.Booking.findOneAndUpdate({ _id: args.bookingID }, updateObj, { new: true });

        console.log("resultBooking created : ", resultBooking)

        return resultBooking
      } catch (error) {
        console.error("Error : ", error)
      }

    },
    deleteBooking: async (parent, args, context, info) => {
      try {
        args = args.bookingID;
        const deleteStatus = true;
        let updateObj = { deleted: deleteStatus }

        let resultBooking = await context.models.Booking.findOneAndUpdate({ _id: args }, updateObj, { new: true });
        if (resultBooking) {
          return resultBooking;
        } else {
          console.log("Error Delet Booking")
        }
        return resultBooking
      } catch (error) {
        console.error("Error : ", error)
      }

    }
    */
   //Test
/*
    db.AlertDump.find().forEach(function(doc){
      print(doc._id + " " + doc.VehicleNo.toUpperCase());
      print("-------------------------------------");
      db.Alarm.find({"LicensePlateNumber":doc.VehicleNo.toUpperCase(),Year:2021,Month:10}).forEach(function(doc1)
      {
            db.FinalResult.insertOne(
               { LicensePlateNumber : doc.VehicleNo.toUpperCase(), TimeStamp:doc1.TimeStamp,SourceLocation:doc1.SourceLocation ,CamName:doc1.CamName }
            )
            print(doc.VehicleNo.toUpperCase() + "," + doc1.TimeStamp +" inserted");
      })
    })
    */