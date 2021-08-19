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
  }
}