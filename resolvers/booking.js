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
      }
    },
    getBookingById: async (parent, args, { models }, info) => {
      try {
        let Booking = await models.Booking.find({ workspace_id: args.workspace_id, site_id: args.site_id, _id: args.booking_id })
        return Booking
      } catch (error) {
        console.error("Error : ", error)
      }
    },
    getBookingByStaff: async (parent, args, { models }, info) => {
      try {
        let Booking = await models.Booking.find({ workspace_id: args.workspace_id, site_id: args.site_id, staff_id: args.staff_id })
        return Booking
      } catch (error) {
        console.error("Error : ", error)
      }
    },
    getBookingByEvent: async (parent, args, { models }, info) => {
      try {
        let Booking = await models.Booking.find({ workspace_id: args.workspace_id, site_id: args.site_id, event_id: args.event_id })
        return Booking
      } catch (error) {
        console.error("Error : ", error)
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

        let arg_appointment_start_time = moment(args.input["availablity"].appointment_start_time, secondsFormat).format(secondsFormat)
        let arg_appointment_end_time = moment(args.input["availablity"].appointment_end_time, secondsFormat).format(secondsFormat)
        let arg_appointment_booking_time = moment(args.input["availablity"].appointment_booking_time, secondsFormat).format(secondsFormat)

        if (args.input["availablity"].is_recurring == true) {
          let i = 0;
          let res = {};
          if (args.input["availablity"].repeat_on == 'Daily') {
            while (bookingStartTime <= bookingEndTime) {

              if (i == 0) {
                res = dateCreate(args.input["availablity"].appointment_start_time, args.input["availablity"].appointment_end_time)
                newBooking.appointment_start_time = arg_appointment_start_time
                newBooking.appointment_end_time = arg_appointment_end_time
                newBooking.appointment_booking_time = arg_appointment_booking_time
                newBooking = await newBooking.save();
                console.log('i ' + i +' - ' +newBooking._id)
              } else {
                res = dateCreate(res.bookingStartTime.add(1, 'days'), res.bookingEndTime.add(1, 'days'))
                newBooking = new models.Booking();
                newBooking.appointment_start_time = res.bookingStartTime
                newBooking.appointment_end_time = res.bookingEndTime
                newBooking.appointment_booking_time = arg_appointment_booking_time
                newBooking.event_id = args.input["availablity"].event_id
                newBooking.staff_id = args.input["availablity"].staff_id
                newBooking.site_id = args.input["availablity"].site_id
                newBooking.workspace_id = args.input["availablity"].workspace_id
                newBooking.is_recurring = args.input["availablity"].is_recurring
                newBooking.Is_cancelled = false
                newBooking.deleted = false
                newBooking = await newBooking.save();
                console.log('i ' + i +' - ' +newBooking._id)
              }
              bookingStartTime.add(1, 'days');
              i++
            }

          } else if (args.input["availablity"].repeat_on == 'Weeks') {
            while (bookingStartTime <= bookingEndTime) {

              if (i == 0) {
                res = dateCreate(args.input["availablity"].appointment_start_time, args.input["availablity"].appointment_end_time)
                newBooking.appointment_start_time = arg_appointment_start_time
                newBooking.appointment_end_time = arg_appointment_end_time
                newBooking.appointment_booking_time = arg_appointment_booking_time
                newBooking = await newBooking.save();
                console.log('i ' + i +' - ' +newBooking._id)
              } else {
                res = dateCreate(res.bookingStartTime.add(7, 'days'), res.bookingEndTime.add(7, 'days'))
                newBooking = new models.Booking();
                newBooking.appointment_start_time = res.bookingStartTime
                newBooking.appointment_end_time = res.bookingEndTime
                newBooking.appointment_booking_time = arg_appointment_booking_time
                newBooking.event_id = args.input["availablity"].event_id
                newBooking.staff_id = args.input["availablity"].staff_id
                newBooking.site_id = args.input["availablity"].site_id
                newBooking.workspace_id = args.input["availablity"].workspace_id
                newBooking.is_recurring = args.input["availablity"].is_recurring
                newBooking.Is_cancelled = false
                newBooking.deleted = false
                newBooking = await newBooking.save();
                console.log('i ' + i +' - ' +newBooking._id)
              }
              bookingStartTime.add(1, 'days');
              i++
            }

          } else if (args.input["availablity"].repeat_on == 'Monthly') {
            while (bookingStartTime <= bookingEndTime) {

              if (i == 0) {
                res = dateCreate(args.input["availablity"].appointment_start_time, args.input["availablity"].appointment_end_time)
                newBooking.appointment_start_time = arg_appointment_start_time
                newBooking.appointment_end_time = arg_appointment_end_time
                newBooking.appointment_booking_time = arg_appointment_booking_time
                newBooking = await newBooking.save();
                console.log('i ' + i +' - ' +newBooking._id)
              } else {
                res = dateCreate(res.bookingStartTime.add(30, 'days'), res.bookingEndTime.add(30, 'days'))
                newBooking = new models.Booking();
                newBooking = new models.Booking();
                newBooking.appointment_start_time = res.bookingStartTime
                newBooking.appointment_end_time = res.bookingEndTime
                newBooking.appointment_booking_time = arg_appointment_booking_time
                newBooking.event_id = args.input["availablity"].event_id
                newBooking.staff_id = args.input["availablity"].staff_id
                newBooking.site_id = args.input["availablity"].site_id
                newBooking.workspace_id = args.input["availablity"].workspace_id
                newBooking.is_recurring = args.input["availablity"].is_recurring
                newBooking.Is_cancelled = false
                newBooking.deleted = false
                newBooking = await newBooking.save();
                console.log('i ' + i +' - ' +newBooking._id)
              }
              bookingStartTime.add(1, 'days');
              i++
            }
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
        // moment(new Date(newBooking.appointment_start_time), "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DDTHH:mm:ss")
        //moment(new Date(newBooking.appointment_end_time), "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DDTHH:mm:ss")
        //newBooking.appointment_booking_time ? "": moment(new Date(newBooking.appointment_end_time), "YYYY-MM-DDTHH:mm:ss").format("YYYY-MM-DD HH:mm:ss")

        // newCustomer.booki = await newCustomer.save();
        // newCustomer = await newCustomer.save();

        return newBooking
      } catch (error) {
        console.error("Error : ", error)
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

let dateCreate = (start_time, end_time) => {
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
}/*
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