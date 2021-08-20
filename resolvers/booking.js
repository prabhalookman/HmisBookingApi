export default {
  Query: {
    getBooking: async (parent, args, { models }, info) => {
      try {
        let Booking = await models.Booking.find({ deleted: false })
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

    },
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

    },
  }
}