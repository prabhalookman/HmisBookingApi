export default {
  Query: {
    getStaffDetails: async (parent, args, { models }, info) => {
          try {
              let staffDetails = await models.StaffDetails.find({deleted:false})
              return staffDetails
          } catch (error) {
              console.error("Error : ", error)
          }

      }
  },
  Mutation: {
      addStaffDetails: async (parent, args, { models }, info) => {
          try {
              let newStaffDetails = new models.StaffDetails();
              let clientKeys = Object.keys(args.input);
              if (!clientKeys)
                  console.log("Error StaffDetails keys")
              let i = 0;
              while (i < clientKeys.length) {
                  if (clientKeys[i] in newStaffDetails) {
                      newStaffDetails[clientKeys[i]] = args.input[clientKeys[i]]
                  }
                  i++
              }

              newStaffDetails = await newStaffDetails.save();
              console.log("newStaffDetails Created : ", newStaffDetails)

              return newStaffDetails
          } catch (error) {
              console.error("Error : ", error)
          }

      },
      updateStaffDetails: async (parent, args, { models }, info) => {
          try {
              let updateObj = { $set: {} };
              for (var param in args.input) {
                  updateObj.$set[param] = args.input[param];
              }
              const resultStaffDetails = await models.StaffDetails.findOneAndUpdate({ _id: args.staffDetailsID }, updateObj, { new: true });

              console.log("resultStaffDetails created : ", resultStaffDetails)

              return resultStaffDetails
          } catch (error) {
              console.error("Error : ", error)
          }

      },
      deleteStaffDetails: async (parent, args, { models }, info) => {
          try {
              args = args.staffDetailsID;
              const deleteStatus = true;
              let updateObj = { deleted: deleteStatus }

              let resultStaffDetails = await models.StaffDetails.findOneAndUpdate({ _id: args }, updateObj, { new: true });
              if (resultStaffDetails) {
                  return resultStaffDetails;
              } else {
                  console.log("Error Delet StaffDetails")
              }
              return resultStaffDetails
          } catch (error) {
              console.error("Error : ", error)
          }

      },
  }
}