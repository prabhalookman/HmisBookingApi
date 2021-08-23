export default {
    Query: {
        getAddOns: async (parent, args, { models }, info) => {
            try {
                let addon = await models.AddOn.find({ delete: false })
                return addon
            } catch (error) {
                console.error("Error : ", error)
            }
        }
    },
    AddOn: {
        event_ids: async (addon) => {
            let resultAddOn = await addon.populate('event_ids').execPopulate();
            return resultAddOn.event_ids
        },
        workspace_ids: async (addon) => {
            let resultAddOn = await addon.populate('workspace_ids').execPopulate();
            return resultAddOn.workspace_ids
        },
        site_id: async (addon) => {
            let resultAddOn = await addon.populate('site_id').execPopulate();
            return resultAddOn.site_id
        }
        
    }
}