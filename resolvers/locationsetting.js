export default {
  Query: {
    getLocationSetting: async (parent, args, context, info) => {
      try {
        let locationsetting = await context.models.LocationSetting.find({})
        return locationsetting
      } catch (error) {
        console.error("Error : ", error)
      }
    }    
  },
  LocationSetting: {
    site_id: async (locsetting, args, context) => {
      const resultLocationSetting = await locsetting.populate('site_id').execPopulate();
      return resultLocationSetting.site_id
    },
    workspace_id: async (locsetting, args, context) => {
      const resultLocationSetting = await locsetting.populate('workspace_id').execPopulate();
      return resultLocationSetting.workspace_id
    },
    location_id: async (locsetting, args, context) => {
      const resultLocationSetting = await locsetting.populate('location_id').execPopulate();
      return resultLocationSetting.location_id
    }
  }
}