export default {
  Query: {
      getAddOns: async (parent, args, { models }, info) => {
          try {
              let addon = await models.AddOn.find({deleted:false})
              return addon
          } catch (error) {
              console.error("Error : ", error)
          }

      }
  },
  Mutation: {
      addAddOn: async (parent, args, { models }, info) => {
          try {
              let newAddOn = new models.AddOn();
              let clientKeys = Object.keys(args.input);
              if (!clientKeys)
                  console.log("Error AddOn keys")
              let i = 0;
              while (i < clientKeys.length) {
                  if (clientKeys[i] in newAddOn) {
                      newAddOn[clientKeys[i]] = args.input[clientKeys[i]]
                  }
                  i++
              }

              newAddOn = await newAddOn.save();
              console.log("newAddOn Created : ", newAddOn)

              return newAddOn
          } catch (error) {
              console.error("Error : ", error)
          }

      },
      updateAddOn: async (parent, args, { models }, info) => {
          try {
              let updateObj = { $set: {} };
              for (var param in args.input) {
                  updateObj.$set[param] = args.input[param];
              }
              const resultAddOn = await models.AddOn.findOneAndUpdate({ _id: args.addOnID }, updateObj, { new: true });

              console.log("resultAddOn created : ", resultAddOn)

              return resultAddOn
          } catch (error) {
              console.error("Error : ", error)
          }

      },
      deleteAddOn: async (parent, args, { models }, info) => {
          try {
              args = args.addOnID;
              const deleteStatus = true;
              let updateObj = { deleted: deleteStatus }

              let resultAddOn = await models.AddOn.findOneAndUpdate({ _id: args }, updateObj, { new: true });
              if (resultAddOn) {
                  return resultAddOn;
              } else {
                  console.log("Error Delet AddOn")
              }
              return resultAddOn
          } catch (error) {
              console.error("Error : ", error)
          }

      },
  }
}