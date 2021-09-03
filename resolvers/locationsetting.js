export default {
  Query: {
    getLocationSetting: async (parent, args, { models }, info) => {
      try {
        let locationsetting = await models.LocationSetting.find({  workspace_id: args.workspace_id, site_id:args.site_id, _id:args.event_id })
        return locationsetting
      } catch (error) {
        console.error("Error : ", error)
      }
    }
  },
  LocationSetting: {
    site_id: async (locsetting, args, { models }) => {
      const resultLocationSetting = await locsetting.populate('site_id').execPopulate();
      return resultLocationSetting.site_id
    },
    workspace_id: async (locsetting, args, { models }) => {
      const resultLocationSetting = await locsetting.populate('workspace_id').execPopulate();
      return resultLocationSetting.workspace_id
    },
    location_id: async (locsetting, args, { models }) => {
      const resultLocationSetting = await locsetting.populate('location_id').execPopulate();
      return resultLocationSetting.location_id
    }
  }
}