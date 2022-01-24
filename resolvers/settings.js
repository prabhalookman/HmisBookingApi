export default {
    Query: {
        getSetting: async (parent, args, context, info) => {
            try {
                let Setting = await context.models.Setting.find({})
                return Setting
            } catch (error) {
                console.error("Error : ", error)
            }
        }
    },
    Setting: {        
        workspace_id: async (setting) => {
            let resultsetting = await setting.populate('workspace_id').execPopulate();
            return resultsetting.workspace_id
        },
        site_id: async (setting) => {
            let resultsetting = await setting.populate('site_id').execPopulate();
            return resultsetting.site_id
        }      
    }
}
