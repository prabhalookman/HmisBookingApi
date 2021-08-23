export default {
  Query: {
    getAddress: async (parent, args, { models }, info) => {
      try {
        let adress = await models.Address.find({ delete: false })
        return adress
      } catch (error) {
        console.error("Error : ", error)
      }
    }
  },
  Address: {
    customer_id: async (address) => {
        let resultAddress = await address.populate('customer_id').execPopulate();
        return resultAddress.customer_id
    },
    workspace_ids: async (address) => {
        let resultAddress = await address.populate('workspace_ids').execPopulate();
        return resultAddress.workspace_ids
    },
    site_id: async (address) => {
        let resultAddress = await address.populate('site_id').execPopulate();
        return resultAddress.site_id
    }
    
}
}