export default {
    Query: {
        getAddOns: async (parent, args, { models }, info) => {
            try {
                let addon = await models.AddOn.find({ deleted: false })
                return addon
            } catch (error) {
                console.error("Error : ", error)
            }
        }
    }
}