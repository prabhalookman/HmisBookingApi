export default {
  Query: {
    getEvents: async (parent, args, { models }, info) => {
      try {
        let event = await models.Event.find({ delete: false })
        return event
      } catch (error) {
        console.error("Error : ", error)
      }
    }
  },
  Event: {
      timing_ids: async (event) => {
          let resultEvent = await event.populate('timing_ids').execPopulate();
          return resultEvent.timing_ids
      },
      workspace_ids: async (event) => {
          let resultEvent = await event.populate('workspace_ids').execPopulate();
          return resultEvent.workspace_ids
      },
      site_id: async (event) => {
          let resultEvent = await event.populate('site_id').execPopulate();
          return resultEvent.site_id
      },
      location_id: async (event) => {
        let resultEvent = await event.populate('location_id').execPopulate();
        return resultEvent.location_id
    }
  }
}