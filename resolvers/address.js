export default {
  Query: {
    getAddress: async (parent, args, { models }, info) => {
          try {
              let adress = await models.Address.find({deleted:false})
              return adress
          } catch (error) {
              console.error("Error : ", error)
          }

      }
  },
  Mutation: {
      addAddress: async (parent, args, { models }, info) => {
          try {
              let newAddress = new models.Address();
              let clientKeys = Object.keys(args.input);
              if (!clientKeys)
                  console.log("Error Address keys")
              let i = 0;
              while (i < clientKeys.length) {
                  if (clientKeys[i] in newAddress) {
                      newAddress[clientKeys[i]] = args.input[clientKeys[i]]
                  }
                  i++
              }

              newAddress = await newAddress.save();
              console.log("newAddress Created : ", newAddress)

              return newAddress
          } catch (error) {
              console.error("Error : ", error)
          }

      },
      updateAddress: async (parent, args, { models }, info) => {
          try {
              let updateObj = { $set: {} };
              for (var param in args.input) {
                  updateObj.$set[param] = args.input[param];
              }
              const resultAddress = await models.Address.findOneAndUpdate({ _id: args.adressID }, updateObj, { new: true });

              console.log("resultAddress created : ", resultAddress)

              return resultAddress
          } catch (error) {
              console.error("Error : ", error)
          }

      },
      deleteAddress: async (parent, args, { models }, info) => {
          try {
              args = args.adressID;
              const deleteStatus = true;
              let updateObj = { deleted: deleteStatus }

              let resultAddress = await models.Address.findOneAndUpdate({ _id: args }, updateObj, { new: true });
              if (resultAddress) {
                  return resultAddress;
              } else {
                  console.log("Error Delet Address")
              }
              return resultAddress
          } catch (error) {
              console.error("Error : ", error)
          }

      },
  }
}