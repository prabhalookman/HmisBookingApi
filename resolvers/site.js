export default {
    Query: {
        getSite: async (parent, args, context, info) => {
            try {
                let Site = await context.models.Site.find({})
                return Site
            } catch (error) {
                console.error("Error : ", error)
            }
        }
    }
}

//workspace_id: args.workspace_id, site_id:args.site_id, _id:args.event_id 