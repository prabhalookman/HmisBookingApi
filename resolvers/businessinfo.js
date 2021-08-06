export default {
  Query: {
      getBusinessInfo: async (parent, args, { models }, info) => {
          try {
              let location = await models.BusinessInfo.find({deleted:false})
              return location
          } catch (error) {
              console.error("Error : ", error)
          }

      }
  },
  Mutation: {
      addBusinessInfo: async (parent, args, { models }, info) => {
          try {
              let newBusinessInfo = new models.BusinessInfo();
              let clientKeys = Object.keys(args.input);
              if (!clientKeys)
                  console.log("Error BusinessInfo keys")
              let i = 0;
              while (i < clientKeys.length) {
                  if (clientKeys[i] in newBusinessInfo) {
                      newBusinessInfo[clientKeys[i]] = args.input[clientKeys[i]]
                  }
                  i++
              }

              newBusinessInfo = await newBusinessInfo.save();
              console.log("newBusinessInfo Created : ", newBusinessInfo)

              return newBusinessInfo
          } catch (error) {
              console.error("Error : ", error)
          }

      },
      updateBusinessInfo: async (parent, args, { models }, info) => {
          try {
              let updateObj = { $set: {} };
              for (var param in args.input) {
                  updateObj.$set[param] = args.input[param];
              }
              const resultBusinessInfo = await models.BusinessInfo.findOneAndUpdate({ _id: args.businessinfoID }, updateObj, { new: true });

              console.log("resultBusinessInfo created : ", resultBusinessInfo)

              return resultBusinessInfo
          } catch (error) {
              console.error("Error : ", error)
          }

      },
      deleteBusinessInfo: async (parent, args, { models }, info) => {
          try {
              args = args.businessinfoID;
              const deleteStatus = true;
              let updateObj = { deleted: deleteStatus }

              let resultBusinessInfo = await models.BusinessInfo.findOneAndUpdate({ _id: args }, updateObj, { new: true });
              if (resultBusinessInfo) {
                  return resultBusinessInfo;
              } else {
                  console.log("Error Delet BusinessInfo")
              }
              return resultBusinessInfo
          } catch (error) {
              console.error("Error : ", error)
          }

      },
  }
}