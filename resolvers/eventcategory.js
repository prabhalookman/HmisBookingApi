export default {
  Query: {
      getEventCategory: async (parent, args, { models }, info) => {
          try {
              let eventCategory = await models.EventCategory.find({deleted:false})
              return eventCategory
          } catch (error) {
              console.error("Error : ", error)
          }

      }
  },
  Mutation: {
      addEventCategory: async (parent, args, { models }, info) => {
          try {
              let newEventCategory = new models.EventCategory();
              let clientKeys = Object.keys(args.input);
              if (!clientKeys)
                  console.log("Error EventCategory keys")
              let i = 0;
              while (i < clientKeys.length) {
                  if (clientKeys[i] in newEventCategory) {
                      newEventCategory[clientKeys[i]] = args.input[clientKeys[i]]
                  }
                  i++
              }

              newEventCategory = await newEventCategory.save();
              console.log("newEventCategory Created : ", newEventCategory)

              return newEventCategory
          } catch (error) {
              console.error("Error : ", error)
          }

      },
      updateEventCategory: async (parent, args, { models }, info) => {
          try {
              let updateObj = { $set: {} };
              for (var param in args.input) {
                  updateObj.$set[param] = args.input[param];
              }
              const resultEventCategory = await models.EventCategory.findOneAndUpdate({ _id: args.eventCategoryID }, updateObj, { new: true });

              console.log("resultEventCategory created : ", resultEventCategory)

              return resultEventCategory
          } catch (error) {
              console.error("Error : ", error)
          }

      },
      deleteEventCategory: async (parent, args, { models }, info) => {
          try {
              args = args.eventCategoryID;
              const deleteStatus = true;
              let updateObj = { deleted: deleteStatus }

              let resultEventCategory = await models.EventCategory.findOneAndUpdate({ _id: args }, updateObj, { new: true });
              if (resultEventCategory) {
                  return resultEventCategory;
              } else {
                  console.log("Error Delet EventCategory")
              }
              return resultEventCategory
          } catch (error) {
              console.error("Error : ", error)
          }

      },
  }
}