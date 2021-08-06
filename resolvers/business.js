export default {
  Query: {
      getBusiness: async (parent, args, { models }, info) => {
          try {
              let location = await models.Business.find({deleted:false})
              return location
          } catch (error) {
              console.error("Error : ", error)
          }

      }
  },
  Mutation: {
      addBusiness: async (parent, args, { models }, info) => {
          try {
              let newBusiness = new models.Business();
              let clientKeys = Object.keys(args.input);
              if (!clientKeys)
                  console.log("Error Business keys")
              let i = 0;
              while (i < clientKeys.length) {
                  if (clientKeys[i] in newBusiness) {
                      newBusiness[clientKeys[i]] = args.input[clientKeys[i]]
                  }
                  i++
              }

              newBusiness = await newBusiness.save();
              console.log("newBusiness Created : ", newBusiness)

              return newBusiness
          } catch (error) {
              console.error("Error : ", error)
          }

      },
      updateBusiness: async (parent, args, { models }, info) => {
          try {
              let updateObj = { $set: {} };
              for (var param in args.input) {
                  updateObj.$set[param] = args.input[param];
              }
              const resultBusiness = await models.Business.findOneAndUpdate({ _id: args.businessID }, updateObj, { new: true });

              console.log("resultBusiness created : ", resultBusiness)

              return resultBusiness
          } catch (error) {
              console.error("Error : ", error)
          }

      },
      deleteBusiness: async (parent, args, { models }, info) => {
          try {
              args = args.businessID;
              const deleteStatus = true;
              let updateObj = { deleted: deleteStatus }

              let resultBusiness = await models.Business.findOneAndUpdate({ _id: args }, updateObj, { new: true });
              if (resultBusiness) {
                  return resultBusiness;
              } else {
                  console.log("Error Delet Business")
              }
              return resultBusiness
          } catch (error) {
              console.error("Error : ", error)
          }

      },
  }
}