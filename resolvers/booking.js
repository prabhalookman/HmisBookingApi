export default {
  Query: {
    getBooking: async (parent, args, { models }, info) => {
      try {
        let Booking = await models.Booking.find({ workspace_id: args.workspace_id, site_id:args.site_id })
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
        let clientKeys = Object.keys(args.input);
        if (!clientKeys)
          console.log("Error Booking keys")
        let i = 0;
        while (i < clientKeys.length) {
          if (clientKeys[i] in newBooking) {
            newBooking[clientKeys[i]] = args.input[clientKeys[i]]
          }
          i++
        }

        newBooking = await newBooking.save();
        console.log("newBooking Created : ", newBooking)

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
    }
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