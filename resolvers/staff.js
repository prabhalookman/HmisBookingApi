export default {
  Query: {
      getStaffs: async (parent, args, { models }, info) => {
          try {
              let staff = await models.Staff.find({deleted:false})
              return staff
          } catch (error) {
              console.error("Error : ", error)
          }

      }
  },
  Mutation: {
      addStaff: async (parent, args, { models }, info) => {
          try {
              let newStaff = new models.Staff();
              let clientKeys = Object.keys(args.input);
              if (!clientKeys)
                  console.log("Error Staff keys")
              let i = 0;
              while (i < clientKeys.length) {
                  if (clientKeys[i] in newStaff) {
                      newStaff[clientKeys[i]] = args.input[clientKeys[i]]
                  }
                  i++
              }

              newStaff = await newStaff.save();
              console.log("newStaff Created : ", newStaff)

              return newStaff
          } catch (error) {
              console.error("Error : ", error)
          }

      },
      updateStaff: async (parent, args, { models }, info) => {
          try {
              let updateObj = { $set: {} };
              for (var param in args.input) {
                  updateObj.$set[param] = args.input[param];
              }
              const resultStaff = await models.Staff.findOneAndUpdate({ _id: args.staffID }, updateObj, { new: true });

              console.log("resultStaff created : ", resultStaff)

              return resultStaff
          } catch (error) {
              console.error("Error : ", error)
          }

      },
      deleteStaff: async (parent, args, { models }, info) => {
          try {
              args = args.staffID;
              const deleteStatus = true;
              let updateObj = { deleted: deleteStatus }

              let resultStaff = await models.Staff.findOneAndUpdate({ _id: args }, updateObj, { new: true });
              if (resultStaff) {
                  return resultStaff;
              } else {
                  console.log("Error Delet Staff")
              }
              return resultStaff
          } catch (error) {
              console.error("Error : ", error)
          }

      },
  }
}