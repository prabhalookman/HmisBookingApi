export default {
  Query: {
      getLocationSetting: async (parent, args, { models }, info) => {
          try {
              let locationsetting = await models.LocationSetting.find({deleted:false})
              return locationsetting
          } catch (error) {
              console.error("Error : ", error)
          }

      }
  },
  Mutation: {
      addLocationSetting: async (parent, args, { models }, info) => {
          try {
              let newLocationSetting = new models.LocationSetting();
              let clientKeys = Object.keys(args.input);
              if (!clientKeys)
                  console.log("Error LocationSetting keys")
              let i = 0;
              while (i < clientKeys.length) {
                  if (clientKeys[i] in newLocationSetting) {
                      newLocationSetting[clientKeys[i]] = args.input[clientKeys[i]]
                  }
                  i++
              }

              newLocationSetting = await newLocationSetting.save();
              console.log("newLocationSetting Created : ", newLocationSetting)

              return newLocationSetting
          } catch (error) {
              console.error("Error : ", error)
          }

      },
      updateLocationSetting: async (parent, args, { models }, info) => {
          try {
              let updateObj = { $set: {} };
              for (var param in args.input) {
                  updateObj.$set[param] = args.input[param];
              }
              const resultLocationSetting = await models.LocationSetting.findOneAndUpdate({ _id: args.locationSettingID }, updateObj, { new: true });

              console.log("resultLocationSetting created : ", resultLocationSetting)

              return resultLocationSetting
          } catch (error) {
              console.error("Error : ", error)
          }

      },
      deleteLocationSetting: async (parent, args, { models }, info) => {
          try {
              args = args.locationSettingID;
              const deleteStatus = true;
              let updateObj = { deleted: deleteStatus }

              let resultLocationSetting = await models.LocationSetting.findOneAndUpdate({ _id: args }, updateObj, { new: true });
              if (resultLocationSetting) {
                  return resultLocationSetting;
              } else {
                  console.log("Error Delet LocationSetting")
              }
              return resultLocationSetting
          } catch (error) {
              console.error("Error : ", error)
          }
      }      
  },
  Locationsetting: {
    site_id: async (locsetting, args, {models}) => {      
      const resultLocationSetting =await locsetting.populate('site_id').execPopulate();
      return resultLocationSetting.site_id
    }
  }
}