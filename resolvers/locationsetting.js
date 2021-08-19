export default {
  Query: {
    getLocationSetting: async (parent, args, { models }, info) => {
      try {
        let locationsetting = await models.LocationSetting.find({ deleted: false })
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
    }
  }
}