import { MyError } from "../helpers/helper";
import moment from "moment-timezone";
import { ObjectId } from "bson";
import { getAvailability, is_bookingExist } from "../helpers/slotcreation";
import { staff_multiple_client_limit } from "../helpers/aggregateFunctions";
export default {
  Query: {
    getBooking: async (parent, args, context, info) => {
      try {
        let Booking = await context.models.Booking.find({
          workspace_id: args.workspace_id,
          site_id: args.site_id,
        }).lean();
        return Booking;
      } catch (error) {
        console.error("Error : ", error);
        throw new Error(error);
      }
    },
    getBookingById: async (parent, args, context, info) => {
      try {
        let Booking = await context.models.Booking.find({
          workspace_id: args.workspace_id,
          site_id: args.site_id,
          _id: args.booking_id,
        });
        return Booking;
      } catch (error) {
        console.error("Error : ", error);
        throw new Error(error);
      }
    },
    getBookingByStaff: async (parent, args, context, info) => {
      try {
        let findObj = {
          workspace_id: ObjectId(args.workspace_id),
          site_id: ObjectId(args.site_id),
          staff_id: ObjectId(args.staff_id),
        };
        let Booking = await context.models.Booking.find(findObj);
        return Booking;
      } catch (error) {
        console.error("Error : ", error);
        throw new Error(error);
      }
    },
    getBookingByEvent: async (parent, args, context, info) => {
      try {
        let findObj = {
          workspace_id: ObjectId(args.workspace_id),
          site_id: ObjectId(args.site_id),
          event_id: ObjectId(args.event_id),
        };
        let Booking = await context.models.Booking.find(findObj);
        return Booking;
      } catch (error) {
        console.error("Error : ", error);
        throw new Error(error);
      }
    },
  },
  Mutation: {
    addBooking: async (parent, args, context, info) => {
      try {
        let newBooking = new context.models.Booking();
        let newCustomer = new context.models.Customer();
        let newAnswer = new context.models.Answer();

        let bookingInput = args.input.availablity;
        let bookingInputKeys = Object.keys(bookingInput);
        let arg_input = args.input["availablity"];
        let customer_ids = [];
        let guest_ids = [];
        let answer_id = null;
        const dateFormat = "YYYY-MM-DD HH:mm:ss";

        //Customer
        if (args.input.customer != undefined) {
          let customer = args.input.customer;
          let customerKeys = Object.keys(customer);
          if (!bookingInputKeys) console.log("Error Booking keys");
          let i = 0;
          while (i < customerKeys.length) {
            if (customerKeys[i] in newCustomer) {
              newCustomer[customerKeys[i]] =
                args.input["customer"][customerKeys[i]];
            }
            i++;
          }

          let customerResult = await context.models.Customer.find({
            email: customer.email,
          });

          if (customerResult.length > 0 && customerResult[0].email) {
            customer_ids.push(customerResult[0]._id);
          } else {
            newCustomer = await newCustomer.save();
            customer_ids.push(newCustomer._id);
          }
        }

        // Guest
        if (args.input.guest != undefined) {
          let guest = args.input.guest;
          if (guest.length > 0) {
            let k = 0;
            while (k < guest.length) {
              let guestKeys = Object.keys(guest[k]);
              let newGuest = new context.models.Guest();
              if (!bookingInputKeys) console.log("Error Booking keys");
              let i = 0;
              while (i < guestKeys.length) {
                if (guestKeys[i] in newGuest) {
                  let phoneArr = [];
                  if (guestKeys[i] == "phone") {
                    let phoneObj = args.input["guest"][k][guestKeys[i]];
                    let newObj = {};
                    for (let q = 0; q < phoneObj.length; q++) {
                      let phoneKeys = Object.keys(phoneObj[q]);                      
                      let j = 0;
                      while (j < phoneKeys.length) {                        
                        if (phoneKeys[j] in phoneObj[q]) {                          
                          newObj[phoneKeys[j]] = phoneObj[q][phoneKeys[j]];                          
                        }
                        j++;
                      } // j-while
                      phoneArr.push(newObj);
                    } // q for
                    console.log('newGuest[guestKeys[i]] : ', newGuest[guestKeys[i]])
                    console.log('newObj : ', newObj)
                    console.log('typeOf : ', typeof(newObj))
                    newGuest[guestKeys[i]].push(newObj) 
                  } else {
                    newGuest[guestKeys[i]] =
                      args.input["guest"][k][guestKeys[i]];
                  }
                }
                i++;
              }
              let guestResult = await context.models.Guest.find({
                email: guest.email,
              });
              if (guestResult.length > 0 && guestResult[0].email) {
                guest_ids.push(guestResult[0]._id);
              } else {
                newGuest = await newGuest.save();
                guest_ids.push(newGuest._id);
              }
              k++;
            }
          }
        } // Guest End

        console.log("guest_ids : ", guest_ids);

        //IntakeForm
        if (args.input.intakeform != undefined) {
          let intakeform = args.input.intakeform;
          let intakeformKeys = Object.keys(intakeform);
          if (!bookingInputKeys) console.log("Error Booking keys");
          let i = 0;
          while (i < intakeformKeys.length) {
            if (intakeformKeys[i] in newAnswer) {
              newAnswer[intakeformKeys[i]] =
                args.input["intakeform"][intakeformKeys[i]];
            }
            i++;
          }
          newAnswer.customer_id = customer_ids[0]
          newAnswer = await newAnswer.save();
          console.log('newAnswer Obect :', newAnswer.toObject())
          console.log('newAnswer :', newAnswer._id)
          answer_id = newAnswer._id;
        }

        //Booking
        if (!bookingInputKeys) console.log("Error Booking keys");
        let createdGuestIds = [];
        let j = 0;
        while (j < bookingInputKeys.length) {
          if (bookingInputKeys[j] in newBooking) {
            newBooking[bookingInputKeys[j]] = arg_input[bookingInputKeys[j]];
          }
          j++;
        }
                
        if (customer_ids.length > 0) {
          newBooking.customer_ids = customer_ids;
        }
        if (answer_id != null) {
          newBooking.answer_id = answer_id;
        }
        let secondsFormat = "YYYY-MM-DDTHH:mm:ss";
        let dateonlyFormat = "YYYY-MM-DD";

        let repeat_temp = moment(
          new Date(newBooking.repeat_upto_date),
          dateonlyFormat
        );

        const repeat_date =
          repeat_temp.year() +
          "-" +
          (repeat_temp.month() + 1) +
          "-" +
          repeat_temp.date();
        //console.log('repeat_date : ', repeat_date)

        let repeat_upto_date = moment(
          new Date(repeat_date),
          secondsFormat
        ).endOf("day");
        //console.log('repeat_upto_date : ', repeat_upto_date)
        
        let {bookingStartTime, bookingEndTime} = dateCreate(arg_input.appointment_start_time, arg_input.appointment_end_time)

        
        let current_time = moment(new Date(), secondsFormat);

        if (bookingStartTime < current_time) {
          console.log(
            "Selected appointment date should be greater than current date"
          );
          throw new Error(
            "Selected appointment date should be greater than current date"
          );
        }

        let success_date = [];
        let disable_date = [];
        let is_valid_booking = true;

        if (
          bookingStartTime.isoWeekday() == 6 ||
          bookingStartTime.isoWeekday() == 7
        ) {
          is_valid_booking = false
          disable_date.push(new moment(bookingStartTime).format("YYYY-MM-DD"));
        } else {
          is_valid_booking = true          
        }

        let uptoDate = moment(new Date(repeat_upto_date), secondsFormat);
        let bookingArray = []

        if (arg_input.is_recurring == true) {
          if (arg_input.repeat_on.toLowerCase() == "daily") {
            let {totalBookings, disable_dates, success_dates} = await createAppoint(
              bookingStartTime,
              uptoDate,
              newBooking,
              context,
              disable_date,
              arg_input,
              customer_ids,              
              1,
              guest_ids,
              answer_id
            );
            bookingArray.push(...totalBookings)
            disable_date = disable_dates
            success_date = success_dates
          } else if (arg_input.repeat_on.toLowerCase() == "weekly") {
            let {totalBookings, disable_dates, success_dates} = await createAppoint(
              bookingStartTime,
              uptoDate,
              newBooking,
              context,
              disable_date,
              arg_input,
              customer_ids,
              7,
              guest_ids,
              answer_id
            );
            bookingArray.push(...totalBookings)
            disable_date = disable_dates
            success_date = success_dates
          } else if (arg_input.repeat_on.toLowerCase() == "monthly") {
            let {totalBookings, disable_dates, success_dates} = await createAppoint(
              bookingStartTime,
              uptoDate,
              newBooking,
              context,
              disable_date,
              arg_input,
              customer_ids,
              30,
              guest_ids,
              answer_id
            );
            bookingArray.push(...totalBookings)
            disable_date = disable_dates
            success_date = success_dates
          }
        } else {
          const checkbook = await checkBook(
            context,
            arg_input.staff_id,
            arg_input.event_id,
            bookingStartTime,
            bookingEndTime,            
            arg_input.workspace_id,
            arg_input.site_id
          );
          if (checkbook) {
            is_valid_booking = false;
            disable_date.push(
              moment(bookingStartTime).format("YYYY-MM-DD")
            )
          }
          newBooking.appointment_start_time = bookingStartTime;
          newBooking.appointment_end_time = bookingEndTime;
          newBooking.appointment_booking_time = moment(new Date(), secondsFormat);

          newBooking.Is_cancelled = false;
          newBooking.deleted = false;
          newBooking.created_by = arg_input.created_by;
          newBooking.customer_ids = customer_ids
          
          if(is_valid_booking){
            success_date.push(
              new moment(bookingStartTime).format("YYYY-MM-DD")
            );
            newBooking = await newBooking.save();
            newBooking = await assignIntoNewBooking (context, newBooking, arg_input, guest_ids, customer_ids)
          bookingArray.push(newBooking)
          }
        }        
        return {
          bookings: bookingArray,
          unavilable_date: disable_date,
          success_date
        };
      } catch (error) {
        console.error("Error : ", error);
        throw new Error(error);
      }
    },
    rescheduleBooking: async (parent, args, context, info) => {
      try {
        let findObj = {
          _id: ObjectId(args.appointment_id),
          Is_cancelled: false,
          deleted: false,
        }; //, workspace_id: ObjectId(args.workspace_id) , site_id: ObjectId(args.site_id) ,
        //console.log(`booking find obj : ${JSON.stringify(findObj)}`)
        let bookingDetails = await context.models.Booking.find(findObj).lean();
        if (bookingDetails.length == 0) {
          console.error("Error : appointment does not exist ");
          throw new Error("Appointment does not exist");
        }
        //console.log('book start  : ', moment(bookingDetails[0].appointment_start_time).format())
        let db_start_time = moment(
          bookingDetails[0].appointment_start_time
        ).format();
        let arg_start_time = moment(args.appointment_start_time).format();
        if (db_start_time === arg_start_time) {
          console.error("Already appointment time and new time are same");
          throw new Error("Already appointment time and new time are same");
        }
        let updateObj = { $set: {} };
        for (var param in args) {
          if (param != "appointment_id") {
            updateObj.$set[param] = args[param];
          }
        }
        updateObj.$set["appointment_time_before_reschedule"] = db_start_time;
        const resultBooking = await context.models.Booking.findOneAndUpdate(
          { _id: ObjectId(args.appointment_id) },
          updateObj,
          { new: true }
        );

        //console.log("resultBooking created : ", resultBooking)

        return resultBooking;

        // let available_result = await getAvailability(args, context)
        // let resp_result = await is_bookingExist(available_result.availableTimes, bookingDetails, 'reschedule')
        // available_result.availableTimes = resp_result
        // return available_result;
      } catch (error) {
        console.error("Error : ", error);
        throw new Error(error);
      }
    },
  },
  Booking: {
    event_id: async (booking) => {
      //console.log('booking Populate: ', booking)
      let resultBooking = await booking.populate("event_id").execPopulate();
      return resultBooking.event_id;
    },
    customer_ids: async (booking) => {
      let resultBooking = await booking.populate("customer_ids").execPopulate();
      return resultBooking.customer_ids;
    },
    guest_ids: async (booking) => {
      let resultBooking = await booking.populate("guest_ids").execPopulate();
      return resultBooking.guest_ids;
    },
    site_id: async (booking) => {
      let resultBooking = await booking.populate("site_id").execPopulate();
      return resultBooking.site_id;
    },
    add_on_ids: async (booking) => {
      let resultBooking = await booking.populate("add_on_ids").execPopulate();
      return resultBooking.add_on_ids;
    },
    staff_id: async (booking) => {
      let resultBooking = await booking.populate("staff_id").execPopulate();
      return resultBooking.staff_id;
    },
    workspace_id: async (booking) => {
      let resultBooking = await booking.populate("workspace_id").execPopulate();
      return resultBooking.workspace_id;
    },
    created_by: async (booking) => {
      let resultBooking = await booking.populate("created_by").execPopulate();
      return resultBooking.created_by;
    },
    location_setting_id: async (booking) => {
      let resultBooking = await booking.populate("location_setting_id").execPopulate();
      return resultBooking.location_setting_id;
    },
    answer_id: async (booking) => {
      let resultBooking = await booking.populate("answer_id").execPopulate();
      // console.log('resultBooking : ', resultBooking.toObject())
      return resultBooking.answer_id;
    },
  },
};
let dateCreate = (start_time, end_time) => {
  try {
    let secondsFormat = "YYYY-MM-DDTHH:mm:ss";
    const timingsStartTime = moment(new Date(start_time), secondsFormat);
    const timingsEndTime = moment(new Date(end_time), secondsFormat);

    //selectedDate.year(), selectedDate.month(), selectedDate.date(), timingsEndTime.format('hh'), timingsEndTime.format('mm'), timingsEndTime.format('sss')

    const startDateStr =
      timingsStartTime.year() +
      "-" +
      (timingsStartTime.month() + 1) +
      "-" +
      timingsStartTime.date() +
      "T" +
      timingsStartTime.format("HH") +
      ":" +
      timingsStartTime.format("mm") +
      ":" +
      timingsStartTime.format("sss");
    const endDateStr =
      timingsEndTime.year() +
      "-" +
      (timingsEndTime.month() + 1) +
      "-" +
      timingsEndTime.date() +
      "T" +
      timingsEndTime.format("HH") +
      ":" +
      timingsEndTime.format("mm") +
      ":" +
      timingsEndTime.format("sss");

    const selectedStartTime = moment(startDateStr, secondsFormat).format(
      secondsFormat
    );
    const selectedEndTime = moment(endDateStr, secondsFormat).format(
      secondsFormat
    );

    const bookingStartTime = moment(selectedStartTime);
    const bookingEndTime = moment(selectedEndTime);

    return {
      bookingStartTime: bookingStartTime,
      bookingEndTime: bookingEndTime,
    };
  } catch (error) {
    throw new Error(error);
  }
};

let createAppoint = async (
  recurring_start_date,
  recurring_end_date,
  newBooking,
  context,
  disable_dates,
  input,
  customer_ids,
  days_count,
  guest_ids,
  answer_id
) => {
  try {
  let totalBookings = [];
  let success_dates = [];
  let i = 0;
  let res = {};
  let secondsFormat = "YYYY-MM-DDTHH:mm:ss";
  // let arg_appointment_start_time = moment(
  //   input.appointment_start_time,
  //   secondsFormat
  // ).format(secondsFormat);

  let current_time = moment(new Date(), secondsFormat);
  if (recurring_start_date < current_time) {
    console.log(
      "Selected appointment date should be greater than current date"
    );
    throw new Error(
      "Selected appointment date should be greater than current date"
    );
  }
  console.log('repeat_day : ', input.repeat_day)
      if(input.repeat_day){
        switch (input.repeat_day.toLowerCase()) {
          case 'sunday': {days_count = 0; break;}
          case 'monday': {days_count = 1; break;}
          case 'tuesday': {days_count = 2; break;}
          case 'wednesday': {days_count = 3; break;}
          case 'thursday': {days_count = 4; break;}
          case 'friday': {days_count = 5; break;}
          case 'saturday': {days_count = 6; break;}
          default: {days_count = 0; break;}
        }
      }
      console.log('days_count : ', days_count)
//console.log('newBooking Object : ', newBooking.toObject())
let {bookingStartTime, bookingEndTime} = dateCreate(
  input.appointment_start_time,
  input.appointment_end_time
);
  while (recurring_start_date <= recurring_end_date) {
    let is_valid_booking = true;
    let passedBookingKeys = Object.keys(newBooking.toObject())
    let newBook = new context.models.Booking();
    let j = 0;
        while (j < passedBookingKeys.length) {
          if (passedBookingKeys[j] in newBooking) {
            if(passedBookingKeys[j] != '_id'){
              newBook[passedBookingKeys[j]] = newBooking[passedBookingKeys[j]];
            }
          }
          j++;
        }        
        
    if (i == 0) {
      //bookingStartTime,bookingEndTime
      //let {bookingStartTime, bookingEndTime} = inputDateToMomentDate(arg_appointment_start_time, arg_appointment_end_time)
      console.log('bookingStartTime.isoWeekday()  -1 : ', bookingStartTime.isoWeekday())
      console.log('bookingStartTime  -1 : ', bookingStartTime)
      if (
        bookingStartTime.isoWeekday() == 6 ||
        bookingStartTime.isoWeekday() == 7
      ) {
        is_valid_booking = false;
        disable_dates.push(new moment(bookingStartTime).format("YYYY-MM-DD"));
      } else {
        is_valid_booking = true;
      }
      newBook.appointment_start_time = bookingStartTime;
      newBook.appointment_end_time = bookingEndTime;
      newBook.appointment_booking_time = moment(new Date(), secondsFormat);
      newBook.Is_cancelled = false;
      newBook.deleted = false;      
      newBook.created_by = input.created_by;
      if(answer_id!=null){
        newBook.answer_id = answer_id;
      }

      const checkbook = await checkBook(
        context,
        input.staff_id,
        input.event_id,
        bookingStartTime,
        bookingEndTime,
        input.workspace_id,
        input.site_id
      );
      console.log('checkbook-1 : ', checkbook) 
      if (checkbook) {
        disable_dates.push(new moment(bookingStartTime).format("YYYY-MM-DD"));
        is_valid_booking = false;
      }      
      if(is_valid_booking){
        newBook = await newBook.save();
        console.log('newBook 1 ', newBook.toObject())  
        success_dates.push(
          new moment(bookingStartTime).format("YYYY-MM-DD")
        ); 
        newBook = await assignIntoNewBooking (context, newBook, input, guest_ids, customer_ids)
        totalBookings.push(newBook);
      }
    } else {
      // console.log('bookingStartTime.isoWeekday()  -2 : ', bookingStartTime.isoWeekday())
      // console.log('bookingStartTime  -2 : ', bookingStartTime)
      if(input.repeat_day){
        bookingStartTime = moment(bookingStartTime).add(1, 'weeks').isoWeekday(days_count)
        bookingEndTime = moment(bookingEndTime).add(1, 'weeks').isoWeekday(days_count)
        // console.log('bookingStartTime.weeks  -2 : ', bookingStartTime.isoWeekday())
        // console.log('bookingStartTime.weeks  -2 : ', bookingStartTime)        
      } else {
        bookingStartTime = bookingStartTime.add(days_count, "days")
        bookingEndTime = bookingEndTime.add(days_count, "days")
      }
      console.log('res.bookingEndTime :', bookingEndTime)
      if (
        bookingStartTime.isoWeekday() == 6 ||
        bookingStartTime.isoWeekday() == 7
      ) {        
        is_valid_booking = false;
        disable_dates.push(new moment(bookingStartTime).format("YYYY-MM-DD"));        
      } else {        
        is_valid_booking = true;
      }

      newBook.appointment_start_time = bookingStartTime;      
      newBook.appointment_end_time = bookingEndTime;
      newBook.appointment_booking_time = moment(new Date(), secondsFormat);

      newBook.Is_cancelled = false;
      newBook.deleted = false;
      newBook.created_by = input.created_by;
      if(answer_id!=null){
        newBook.answer_id = answer_id;
      }

      const checkbook = await checkBook(
        context,
        input.staff_id,
        input.event_id,
        bookingStartTime,
        bookingEndTime,
        input.workspace_id,
        input.site_id
      );
      console.log('checkbook-2 : ', checkbook) 

      if (checkbook) {
        is_valid_booking = false;
        disable_dates.push(new moment(bookingStartTime).format("YYYY-MM-DD"));        
      }      
      if(is_valid_booking){        
          newBook = await newBook.save();
          success_dates.push(
            new moment(bookingStartTime).format("YYYY-MM-DD")
          );
          console.log('newBook 2 ', newBook.toObject())     
        newBook = await assignIntoNewBooking (context, newBook, input, guest_ids, customer_ids)
        totalBookings.push(newBook);
      }      
    }
    if(input.repeat_day){
      console.log('recurring_start_date.weeks  before : ', recurring_start_date)
      recurring_start_date = moment(recurring_start_date).add(1, 'weeks').isoWeekday(days_count)
      console.log('recurring_start_date.weeks  after : ', recurring_start_date)        
    } else {
      recurring_start_date.add(days_count, "days");
    }
    i++;
  }
  console.log("totalBookings : ", totalBookings.length);  
  console.log("Repeat disable_dates : ", disable_dates);  
  console.log("Repeat success_dates : ", success_dates);  
  return {
    totalBookings,
    disable_dates,
    success_dates
  };
} catch (error) {
  console.log('Error : ', error) 
 }
};

let assignIntoNewBooking = async (context,newBooking, arg_input, guest_ids, customer_ids) => {
          newBooking.progress.push({ status: "Booked" });
          newBooking.guest_ids = guest_ids;
          newBooking.created_by = arg_input.created_by;
          newBooking = await newBooking.save();

          // console.log("Customer ids : ", customer_ids);
          // console.log("Guest ids : ", guest_ids);
          // console.log("Booking id : ", newBooking._id);

          //update Customer With Guest Id
          let updateCust = { $push: {} };
          updateCust.$push["guest_ids"] = { $each: guest_ids };
          updateCust.$push["booking_ids"] = newBooking._id;
          //console.log("updateCust : ", updateCust);
          const resultCustomers =
            await context.models.Customer.findOneAndUpdate(
              { _id: customer_ids },
              updateCust
            );
          //console.log("resultCustomers : ", resultCustomers);

          //update Guest with Booking Id
          let updateGuest = { $push: {} };
          updateGuest.$push["booking_ids"] = newBooking._id;
          updateGuest.$push["invited_customer_id"] = customer_ids;

          //console.log("updateCust : ", updateGuest);
          const resultGuests = await context.models.Guest.updateMany(
            { _id: { $in: guest_ids } },
            updateGuest
          );
          //console.log("resultGuests : ", resultGuests);

          //update staff
          let updateObj = { $push: {} };
          updateObj.$push["appointment_booking_ids"] = ObjectId(newBooking._id);
          const resultStaffs = await context.models.Staff.find(
            { _id: newBooking.staff_id },
            { staff_detail_id: 1 }
          );
          //console.log('update : ', JSON.stringify(updateObj))
          const resultStaffDetails =
            await context.models.StaffDetails.findOneAndUpdate(
              { _id: resultStaffs[0].staff_detail_id },
              updateObj,
              { new: true }
            );
          if (resultStaffDetails) {
            console.log("resultStaffDetails updated ", resultStaffDetails._id);
          } else {
            const deletedBooking = await context.models.Booking.deleteOne({
              _id: newBooking._id,
            });
            console.error(
              "Booking Error : Booking not successful : ",
              newBooking._id
            );
            throw new Error("Booking Error : Booking not successful");
          }
          return newBooking
}



let checkBook = async (
  context,
  staffid,
  eventid,
  appointmentstarttime,
  appointmentendtime,
  workspace_id,
  site_id
) => {
  try {
    let bookingDetails = [];
    // const bookdate = moment(
    //   new Date(appointmentstarttime),
    //   "YYYY-MM-DDTHH:mm:ss"
    // ).toISOString();
    //console.log('bookdate : ', bookdate);
    let findQuery = {
      staff_id: ObjectId(staffid) ,
      event_id: ObjectId(eventid),
      Is_cancelled: false,
      deleted: false,
      appointment_start_time: new Date(appointmentstarttime),
      workspace_id: ObjectId(workspace_id),
      site_id: ObjectId(site_id),
    }
    //console.log('find Query : ', findQuery)
    bookingDetails = await context.models.Booking.find(findQuery).lean();

    let startday = moment(new Date(appointmentstarttime)).startOf("day");
    let endday = moment(new Date(appointmentendtime)).endOf("day");

    let bookingCounts = await context.models.Booking.aggregate(
      staff_multiple_client_limit(
        staffid,
        eventid,
        startday,
        endday,
        workspace_id,
        site_id
      )
    );

    console.log("bookingCounts : ", bookingCounts);
    let is_multiple_client = null;
    if (bookingCounts && bookingCounts.length > 0) {
      is_multiple_client = bookingCounts[0].staff_multiple_client[0];
    }
    //console.log('bookingDetails length: ', bookingDetails.length );

    // && is_multiple_client == false :: it has to apply to validate booking check
    if (bookingDetails.length > 0 ) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(error);
  }
};
