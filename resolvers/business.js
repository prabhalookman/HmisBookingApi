export default {
    Query: {
        getBusiness: async (parent, args, { models }, info) => {
            try {
                let business = await models.Business.find({ delete: false })
                return business
            } catch (error) {
                console.error("Error : ", error)
            }
        }
    },
    Business: {
        
        workspace_id: async (business) => {
            let resultBusiness = await business.populate('workspace_id').execPopulate();
            return resultBusiness.workspace_id
        },
        site_id: async (business) => {
            let resultBusiness = await business.populate('site_id').execPopulate();
            return resultBusiness.site_id
        }
    }

}

/*
address_ids: async (business) => {
            let resultBusiness = await business.populate('address_ids').execPopulate();
            return resultBusiness.address_ids
        },
*/