import { MyError }  from '../helpers/helper'
import moment from 'moment-timezone';
export default {
  Query: {
    getBooking: async (parent, args, { models }, info) => {
      try {
        let Booking = await models.Booking.find({ workspace_id: args.workspace_id, site_id:args.site_id })
        return Booking
      } catch (error) {
        console.error("Error : ", error)
      }
    },
    getBookingById: async (parent, args, { models }, info) => {
      try {
        let Booking = await models.Booking.find({ workspace_id: args.workspace_id, site_id:args.site_id, _id: args.booking_id })
        return Booking
      } catch (error) {
        console.error("Error : ", error)
      }
    },
    getBookingByStaff: async (parent, args, { models }, info) => {
      try {
        let Booking = await models.Booking.find({ workspace_id: args.workspace_id, site_id:args.site_id, staff_id:args.staff_id })
        return Booking
      } catch (error) {
        console.error("Error : ", error)
      }
    },
    getBookingByEvent: async (parent, args, { models }, info) => {
      try {
        let Booking = await models.Booking.find({ workspace_id: args.workspace_id, site_id:args.site_id, event_id: args.event_id })
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
        let customerResult = await models.Customer.find({email: customer.email})
        
        if(customerResult.length > 0 && customerResult[0].email){
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
          //console.log(`newCustomer : ${JSON.stringify(newCustomer)}`)
          
          customer_ids.push(newCustomer._id)
          // console.log(`Customer ID : ${newCustomer._id}`)
          // console.log(`Customer ID 2 : ${customer_ids}`)
          

          
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

      //console.log(`newBooking : ${JSON.stringify(newBooking)}`)
      newBooking = await newBooking.save();
        

        //RESPONSE
        if(newBooking){
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