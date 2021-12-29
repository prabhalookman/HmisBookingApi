export default {
    Query: {
        getLocation: async (parent, args, context, info) => {
            try {
                let location = await context.models.Location.find({  workspace_id: args.workspace_id, site_id:args.site_id, _id:args.event_id })
                return location
            } catch (error) {
                console.error("Error : ", error)
            }
        }
    }
}