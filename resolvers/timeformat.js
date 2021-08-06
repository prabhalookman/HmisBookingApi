export default {
    Query: {
        getTimeFormats: async (parent, args, { models }, info) => {
            try {
                let timeformat = await models.TimeFormat.find({deleted:false})
                return timeformat
            } catch (error) {
                console.error("Error : ", error)
            }
  
        }
    },
    Mutation: {
        addTimeFormat: async (parent, args, { models }, info) => {
            try {
                let newTimeFormat = new models.TimeFormat();
                let clientKeys = Object.keys(args.input);
                if (!clientKeys)
                    console.log("Error TimeFormat keys")
                let i = 0;
                while (i < clientKeys.length) {
                    if (clientKeys[i] in newTimeFormat) {
                        newTimeFormat[clientKeys[i]] = args.input[clientKeys[i]]
                    }
                    i++
                }
  
                newTimeFormat = await newTimeFormat.save();
                console.log("newTimeFormat Created : ", newTimeFormat)
  
                return newTimeFormat
            } catch (error) {
                console.error("Error : ", error)
            }
  
        },
        updateTimeFormat: async (parent, args, { models }, info) => {
            try {
                let updateObj = { $set: {} };
                for (var param in args.input) {
                    updateObj.$set[param] = args.input[param];
                }
                const resultTimeFormat = await models.TimeFormat.findOneAndUpdate({ _id: args.timeFormatID }, updateObj, { new: true });
  
                console.log("resultTimeFormat created : ", resultTimeFormat)
  
                return resultTimeFormat
            } catch (error) {
                console.error("Error : ", error)
            }
  
        },
        deleteTimeFormat: async (parent, args, { models }, info) => {
            try {
                args = args.timeFormatID;
                const deleteStatus = true;
                let updateObj = { deleted: deleteStatus }
  
                let resultTimeFormat = await models.TimeFormat.findOneAndUpdate({ _id: args }, updateObj, { new: true });
                if (resultTimeFormat) {
                    return resultTimeFormat;
                } else {
                    console.log("Error Delet TimeFormat")
                }
                return resultTimeFormat
            } catch (error) {
                console.error("Error : ", error)
            }
  
        },
    },
    TimeFormat: {
        site_id: async(timeformat, args, {models}) =>{
          const resultTimeFormat = await timeformat.populate('site_id').execPopulate()
          return resultTimeFormat.site_id
        },
        workspace_id: async(timeformat, args, {models}) =>{
            const resultTimeFormat = await timeformat.populate('workspace_id').execPopulate()
            return resultTimeFormat.workspace_id
          }
    }
  }