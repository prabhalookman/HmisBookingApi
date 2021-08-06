export default {
  Query: {
      getLocation: async (parent, args, { models }, info) => {
          try {
              let location = await models.Location.find({deleted:false})
              return location
          } catch (error) {
              console.error("Error : ", error)
          }

      }
  },
  Mutation: {
      addLocation: async (parent, args, { models }, info) => {
          try {
              let newLocation = new models.Location();
              let clientKeys = Object.keys(args.input);
              if (!clientKeys)
                  console.log("Error Location keys")
              let i = 0;
              while (i < clientKeys.length) {
                  if (clientKeys[i] in newLocation) {
                      newLocation[clientKeys[i]] = args.input[clientKeys[i]]
                  }
                  i++
              }

              newLocation = await newLocation.save();
              console.log("newLocation Created : ", newLocation)

              return newLocation
          } catch (error) {
              console.error("Error : ", error)
          }

      },
      updateLocation: async (parent, args, { models }, info) => {
          try {
              let updateObj = { $set: {} };
              for (var param in args.input) {
                  updateObj.$set[param] = args.input[param];
              }
              const resultLocation = await models.Location.findOneAndUpdate({ _id: args.locationID }, updateObj, { new: true });

              console.log("resultLocation created : ", resultLocation)

              return resultLocation
          } catch (error) {
              console.error("Error : ", error)
          }

      },
      deleteLocation: async (parent, args, { models }, info) => {
          try {
              args = args.locationID;
              const deleteStatus = true;
              let updateObj = { deleted: deleteStatus }

              let resultLocation = await models.Location.findOneAndUpdate({ _id: args }, updateObj, { new: true });
              if (resultLocation) {
                  return resultLocation;
              } else {
                  console.log("Error Delet Location")
              }
              return resultLocation
          } catch (error) {
              console.error("Error : ", error)
          }

      },
  }
}