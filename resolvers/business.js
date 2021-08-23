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
        address_ids: async (business) => {
            let resultBusiness = await business.populate('address_ids').execPopulate();
            return resultBusiness.address_ids
        },
        workspace_ids: async (business) => {
            let resultBusiness = await business.populate('workspace_ids').execPopulate();
            return resultBusiness.workspace_ids
        },
        site_id: async (business) => {
            let resultBusiness = await business.populate('site_id').execPopulate();
            return resultBusiness.site_id
        }
    }

}