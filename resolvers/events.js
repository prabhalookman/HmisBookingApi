import { ObjectId } from 'bson';
export default {
  Query: {
    getEvents: async (parent, args, { models }, info) => {
      try {
        let event = await models.Event.find({ site_id: args.site_id })
        return event
      } catch (error) {
        console.error("Error : ", error)
      }
    },
    getEventsDetailByStaff: async (parent, args, { models }, info) => {
      try {
        let staffEvent = await models.Event.find({ workspace_id: args.workspace_id, site_id: args.site_id,  staff_ids: args.staff_ids })
        return staffEvent
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
      staff_ids: async (event) => {
        let resultEvent = await event.populate('staff_ids').execPopulate();
        return resultEvent.staff_ids
      },
      location_id: async (event) => {
        let resultEvent = await event.populate('location_id').execPopulate();
        return resultEvent.location_id
    }
  }
}