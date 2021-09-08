import { ObjectId } from 'bson';
export default {
  Query: {
    getEvents: async (parent, args, { models }, info) => {
      try {
        let event = await models.Event.find({workspace_ids: args.workspace_id, site_id:args.site_id})
        //workspace_ids: args.workspace_id, site_id:args.site_id
        return event
      } catch (error) {
        console.error("Error : ", error)
      }
    },
    getEventsDetailByStaff: async (parent, args, { models }, info) => {
      try {
        let staffEvent = await models.Event.find({workspace_ids: args.workspace_id, site_id:args.site_id, staff_ids: args.staff_ids})
        console.log(`staffEvent Count : `, staffEvent.length)
        return staffEvent
      } catch (error) {
        console.error("Error : ", error)
      }
    },
    getLocationByServiceId: async (parent, args, { models }, info) => {
      try {
        let locationEvents = await models.Event.find({  workspace_id: args.workspace_id, site_id:args.site_id, _id:args.event_id })
        return locationEvents        
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
      workspace_id: async (event) => {
          let resultEvent = await event.populate('workspace_id').execPopulate();
          return resultEvent.workspace_id
      },
      site_id: async (event) => {
          let resultEvent = await event.populate('site_id').execPopulate();
          return resultEvent.site_id
      },
      staff_ids: async (event) => {
        let resultEvent = await event.populate('staff_ids').execPopulate();
        return resultEvent.staff_ids
      },
      location_setting_ids: async (event) => {
        let resultEvent = await event.populate('location_setting_ids').execPopulate();
        return resultEvent.location_setting_ids
    }
  }
}