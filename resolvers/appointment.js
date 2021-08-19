export default {
  Query: {
    getAppointment: async (parent, args, { models }, info) => {
      try {
        let appointment = await models.Appointment.find({ deleted: false })
        return appointment
      } catch (error) {
        console.error("Error : ", error)
      }
    }
  },
  Mutation: {
    addAppointment: async (parent, args, { models }, info) => {
      try {
        let newAppointment = new models.Appointment();
        let clientKeys = Object.keys(args.input);
        if (!clientKeys)
          console.log("Error Appointment keys")
        let i = 0;
        while (i < clientKeys.length) {
          if (clientKeys[i] in newAppointment) {
            newAppointment[clientKeys[i]] = args.input[clientKeys[i]]
          }
          i++
        }

        newAppointment = await newAppointment.save();
        console.log("newAppointment Created : ", newAppointment)

        return newAppointment
      } catch (error) {
        console.error("Error : ", error)
      }

    },
    updateAppointment: async (parent, args, { models }, info) => {
      try {
        let updateObj = { $set: {} };
        for (var param in args.input) {
          updateObj.$set[param] = args.input[param];
        }
        const resultAppointment = await models.Appointment.findOneAndUpdate({ _id: args.AppointmentID }, updateObj, { new: true });

        console.log("resultAppointment created : ", resultAppointment)

        return resultAppointment
      } catch (error) {
        console.error("Error : ", error)
      }

    },
    deleteAppointment: async (parent, args, { models }, info) => {
      try {
        args = args.AppointmentID;
        const deleteStatus = true;
        let updateObj = { deleted: deleteStatus }

        let resultAppointment = await models.Appointment.findOneAndUpdate({ _id: args }, updateObj, { new: true });
        if (resultAppointment) {
          return resultAppointment;
        } else {
          console.log("Error Delet Appointment")
        }
        return resultAppointment
      } catch (error) {
        console.error("Error : ", error)
      }

    },
  }
}