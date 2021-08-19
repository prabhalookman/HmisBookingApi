export default {
    Query: {
        getLocation: async (parent, args, { models }, info) => {
            try {
                let location = await models.Location.find({ deleted: false })
                return location
            } catch (error) {
                console.error("Error : ", error)
            }
        }
    }
}