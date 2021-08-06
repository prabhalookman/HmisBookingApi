export default {
  Query: {
    getEvents: async (parent, args, { models }, info) => {
          try {
              let event = await models.Event.find({deleted:false})
              return event
          } catch (error) {
              console.error("Error : ", error)
          }

      }
  },
  Mutation: {
      addEvent: async (parent, args, { models }, info) => {
          try {
              let newEvent = new models.Event();
              let clientKeys = Object.keys(args.input);
              if (!clientKeys)
                  console.log("Error Event keys")
              let i = 0;
              while (i < clientKeys.length) {
                  if (clientKeys[i] in newEvent) {
                      newEvent[clientKeys[i]] = args.input[clientKeys[i]]
                  }
                  i++
              }

              newEvent = await newEvent.save();
              console.log("newEvent Created : ", newEvent)

              return newEvent
          } catch (error) {
              console.error("Error : ", error)
          }

      },
      updateEvent: async (parent, args, { models }, info) => {
          try {
              let updateObj = { $set: {} };
              for (var param in args.input) {
                  updateObj.$set[param] = args.input[param];
              }
              const resultEvent = await models.Event.findOneAndUpdate({ _id: args.eventID }, updateObj, { new: true });

              console.log("resultEvent created : ", resultEvent)

              return resultEvent
          } catch (error) {
              console.error("Error : ", error)
          }

      },
      deleteEvent: async (parent, args, { models }, info) => {
          try {
              args = args.eventID;
              const deleteStatus = true;
              let updateObj = { deleted: deleteStatus }

              let resultEvent = await models.Event.findOneAndUpdate({ _id: args }, updateObj, { new: true });
              if (resultEvent) {
                  return resultEvent;
              } else {
                  console.log("Error Delet Event")
              }
              return resultEvent
          } catch (error) {
              console.error("Error : ", error)
          }

      },
  }
}