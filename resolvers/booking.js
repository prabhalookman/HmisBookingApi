import { MyError } from '../helpers/helper'
import moment from 'moment-timezone';
export default {
  Query: {
    getBooking: async (parent, args, { models }, info) => {
      try {
        let Booking = await models.Booking.find({ workspace_id: args.workspace_id, site_id: args.site_id })
        return Booking
      } catch (error) {
        console.error("Error : ", error)
        throw new Error(error)
      }
    },
    getBookingById: async (parent, args, { models }, info) => {
      try {
        let Booking = await models.Booking.find({ workspace_id: args.workspace_id, site_id: args.site_id, _id: args.booking_id })
        return Booking
      } catch (error) {
        console.error("Error : ", error)
        throw new Error(error)
      }
    },
    getBookingByStaff: async (parent, args, { models }, info) => {
      try {
        let Booking = await models.Booking.find({ workspace_id: args.workspace_id, site_id: args.site_id, staff_id: args.staff_id })
        return Booking
      } catch (error) {
        console.error("Error : ", error)
        throw new Error(error)
      }
    },
    getBookingByEvent: async (parent, args, { models }, info) => {
      try {
        let Booking = await models.Booking.find({ workspace_id: args.workspace_id, site_id: args.site_id, event_id: args.event_id })
        return Booking
      } catch (error) {
        console.error("Error : ", error)
        throw new Error(error)
      }
    }
  },
  Mutation: {
    addBooking: async (parent, args, { models }, info) => {
      try {
        let newBooking = new models.Booking();
        let newCustomer = new models.Customer();

        let bookingInput = args.input.availablity
        let bookingInputKeys = Object.keys(bookingInput)

        let customer = args.input.customer
        let customerKeys = Object.keys(customer);

        //Customer
        if (!bookingInputKeys)
          console.log("Error Booking keys")
        let i = 0;
        while (i < customerKeys.length) {
          if (customerKeys[i] in newCustomer) {
            newCustomer[customerKeys[i]] = args.input["customer"][customerKeys[i]]
          }
          i++
        }
        let customer_ids = []
        let customerResult = await models.Customer.find({ email: customer.email })

        if (customerResult.length > 0 && customerResult[0].email) {
          console.log("Customer already exist")
          customer_ids.push(customerResult[0]._id)
          // try {
          //   let updateObj = { $set: {} };
          //   for (var param in bookingInput) {
          //     updateObj.$set[param] = bookingInput[param];
          //   }
          //   newBooking = await models.Booking.findOneAndUpdate({ customer_ids: customerResult[0]._id }, updateObj, { new: true });    
          //   console.log("Booking updated : ", newBooking)

          // } catch (error) {
          //   console.error("Error : ", error)
          // }

          //throw new Error("Customer already exist")          
        } else {
          newCustomer = await newCustomer.save();
          customer_ids.push(newCustomer._id)
        }
        //Booking
        if (!bookingInputKeys)
          console.log("Error Booking keys")
        let j = 0;
        while (j < bookingInputKeys.length) {
          if (bookingInputKeys[j] in newBooking) {
            newBooking[bookingInputKeys[j]] = args.input["availablity"][bookingInputKeys[j]]
          }
          j++
        }
        newBooking.customer_ids = customer_ids

        let secondsFormat = "YYYY-MM-DDTHH:mm:ss";
        //let repeat_upto_date = moment(new Date(newBooking.repeat_upto_date), "YYYY-MM-DDTHH:mm:ss").toISOString()
        const timingsStartTime = moment(new Date(args.input["availablity"].appointment_start_time), secondsFormat)
        const timingsEndTime = moment(new Date(args.input["availablity"].repeat_upto_date), secondsFormat)

        const startDateStr = timingsStartTime.year() + '-' + (timingsStartTime.month() + 1) + '-' + timingsStartTime.date()
        const endDateStr = timingsEndTime.year() + '-' + (timingsEndTime.month() + 1) + '-' + timingsEndTime.date()

        const selectedStartTime = moment(startDateStr, secondsFormat).format(secondsFormat);
        const selectedEndTime = moment(endDateStr, secondsFormat).format(secondsFormat);

        const bookingStartTime = moment(selectedStartTime, secondsFormat)
        const bookingEndTime = moment(selectedEndTime, secondsFormat)

        console.log('bookingStartTime : ', bookingStartTime)
        console.log('bookingEndTime : ', bookingEndTime)
        const dateFormat = "YYYY-MM-DD HH:mm:ss";

        let available_date = [];
        let disable_date = [];
        //if (details.business_timings == false || details.business_timings == true) {

        let bookStartDate = moment(timingsStartTime, "YYYY-MM-DD HH:mm:ss")
        let maxDate = moment(selectedEndTime, dateFormat)

        while (bookStartDate <= maxDate) {
          if (bookStartDate.isoWeekday() == 6 || bookStartDate.isoWeekday() == 7) {
            disable_date.push(new moment(bookStartDate).format('YYYY-MM-DD'))
          } else {
            available_date.push(new moment(bookStartDate).format('YYYY-MM-DD'))
          }
          bookStartDate.add(1, 'days');
        }

        console.log('disable_date : ', disable_date)
        console.log('available_date : ', available_date)

        if (args.input["availablity"].is_recurring == true) {
         
          if (args.input["availablity"].repeat_on == 'Daily') {
            newBooking = createAppoint (bookingStartTime ,bookingEndTime, newBooking, models,disable_date, args.input["availablity"], 1)
          } 
          else if (args.input["availablity"].repeat_on == 'Weekly') {
            newBooking = createAppoint (bookingStartTime ,bookingEndTime, newBooking, models,disable_date, args.input["availablity"], 7)

          } else if (args.input["availablity"].repeat_on == 'Monthly') {
            newBooking = createAppoint (bookingStartTime ,bookingEndTime, newBooking, models,disable_date, args.input["availablity"], 30)
          }
        } else {
          newBooking = await newBooking.save();
        }

        //RESPONSE
        if (newBooking) {
          newBooking.appointment_start_time = moment.utc(newBooking.appointment_start_time)
          newBooking.appointment_end_time = moment.utc(newBooking.appointment_end_time)
          newBooking.appointment_booking_time = moment.utc(newBooking.appointment_booking_time)
        }

        return newBooking
      } catch (error) {
        console.error("Error : ", error)
        throw new Error(error)
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

let createAppoint = async (recurring_start_date ,recurring_end_date,newBooking, models, disable_date, input, days_count) =>{
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
      const checkbook = await checkBook(models, input.staff_id, input.event_id, input.appointment_start_time)
      
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
      const checkbook = await checkBook(models, input.staff_id, input.event_id, res.bookingStartTime)
      
      if (checkbook) {
        throw new Error(`Booking not available in this slot ${res.bookingStartTime}, please select another slot`)
      }
      if(disable_date.includes(moment(arg_appointment_start_time).format('YYYY-MM-DD'))){
        throw new Error(`Can not book in this disabled day ${arg_appointment_start_time}, please select another slot`)
      }
      newBooking = new models.Booking();
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

let checkBook = async (models, staffid, eventid,  appointmentstarttime) => {
  try {
    let bookingDetails = [];
    const bookdate   = moment(new Date(appointmentstarttime), "YYYY-MM-DDTHH:mm:ss").toISOString() 
    console.log('bookdate : ', bookdate);
    bookingDetails = await models.Booking.find({ staff_id: staffid, event_id: eventid, Is_cancelled: false, deleted: false, appointment_start_time: new Date(bookdate)  })
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
    updateBooking: async (parent, args, { models }, info) => {
      try {
        let updateObj = { $set: {} };
        for (var param in args.input) {
          updateObj.$set[param] = args.input[param];
        }
        const resultBooking = await models.Booking.findOneAndUpdate({ _id: args.bookingID }, updateObj, { new: true });

        console.log("resultBooking created : ", resultBooking)

        return resultBooking
      } catch (error) {
        console.error("Error : ", error)
      }

    },
    deleteBooking: async (parent, args, { models }, info) => {
      try {
        args = args.bookingID;
        const deleteStatus = true;
        let updateObj = { deleted: deleteStatus }

        let resultBooking = await models.Booking.findOneAndUpdate({ _id: args }, updateObj, { new: true });
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