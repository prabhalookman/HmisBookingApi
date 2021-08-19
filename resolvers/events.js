export default {
  Query: {
    getEvents: async (parent, args, { models }, info) => {
      try {
        let event = await models.Event.find({ deleted: false })
        return event
      } catch (error) {
        console.error("Error : ", error)
      }
    }
  }
}