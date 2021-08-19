export default {
    Query: {
        getTimings: async (parent, args, { models }, info) => {
            try {
                let timings = await models.Timings.find({ deleted: false })
                return timings
            } catch (error) {
                console.error("Error : ", error)
            }
        }
    },
    Timings: {
        site_id: async (timings, args, { models }) => {
            const resultTimings = await timings.populate('site_id').execPopulate()
            return resultTimings.site_id
        },
        service_ids: async (timings, args, { models }) => {
            const resultTimings = await timings.populate('service_ids').execPopulate()
            return resultTimings.service_ids
        },
        // created_by: async(timings, args, {models}) =>{
        //     const resultTimings = await timings.populate('created_by').execPopulate()
        //     return resultTimings.created_by
        // },
        workspace_ids: async (timings, args, { models }) => {
            const resultTimings = await timings.populate('workspace_ids').execPopulate()
            return resultTimings.workspace_ids
        },
        location_setting_ids: async (timings, args, { models }) => {
            const resultTimings = await timings.populate('location_setting_ids').execPopulate()
            return resultTimings.location_setting_ids
        }
    }
}