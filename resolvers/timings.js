export default {
    Query: {
        getTimings: async (parent, args, { models }, info) => {
            try {
                let timings = await models.Timings.find({deleted:false})
                return timings
            } catch (error) {
                console.error("Error : ", error)
            }
  
        }
    },
    Mutation: {
        addTimings: async (parent, args, { models }, info) => {
            try {
                let newTimings = new models.Timings();
                let clientKeys = Object.keys(args.input);
                if (!clientKeys)
                    console.log("Error Timings keys")
                let i = 0;
                while (i < clientKeys.length) {
                    if (clientKeys[i] in newTimings) {
                        newTimings[clientKeys[i]] = args.input[clientKeys[i]]
                    }
                    i++
                }
  
                newTimings = await newTimings.save();
                console.log("newTimings Created : ", newTimings)
  
                return newTimings
            } catch (error) {
                console.error("Error : ", error)
            }
  
        },
        updateTimings: async (parent, args, { models }, info) => {
            try {
                let updateObj = { $set: {} };
                for (var param in args.input) {
                    updateObj.$set[param] = args.input[param];
                }
                const resultTimings = await models.Timings.findOneAndUpdate({ _id: args.timingsID }, updateObj, { new: true });
  
                console.log("resultTimings created : ", resultTimings)
  
                return resultTimings
            } catch (error) {
                console.error("Error : ", error)
            }
  
        },
        deleteTimings: async (parent, args, { models }, info) => {
            try {
                args = args.timingsID;
                const deleteStatus = true;
                let updateObj = { deleted: deleteStatus }
  
                let resultTimings = await models.Timings.findOneAndUpdate({ _id: args }, updateObj, { new: true });
                if (resultTimings) {
                    return resultTimings;
                } else {
                    console.log("Error Delet Timings")
                }
                return resultTimings
            } catch (error) {
                console.error("Error : ", error)
            }
  
        },
    },
    Timings: {        
        site_id: async(timings, args, {models}) =>{
          const resultTimings = await timings.populate('site_id').execPopulate()
          return resultTimings.site_id
        },
        service_ids: async(timings, args, {models}) =>{
            const resultTimings = await timings.populate('service_ids').execPopulate()
            return resultTimings.service_ids
        },
        created_by: async(timings, args, {models}) =>{
            const resultTimings = await timings.populate('created_by').execPopulate()
            return resultTimings.created_by
        },
        workspace_ids: async(timings, args, {models}) =>{
            const resultTimings = await timings.populate('workspace_ids').execPopulate()
            return resultTimings.workspace_ids
        },
        location_setting_ids: async(timings, args, {models}) =>{
            const resultTimings = await timings.populate('location_setting_ids').execPopulate()
            return resultTimings.location_setting_ids
        }
      }
  }