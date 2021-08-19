export default {
  Query: {
    getAddress: async (parent, args, { models }, info) => {
      try {
        let adress = await models.Address.find({ deleted: false })
        return adress
      } catch (error) {
        console.error("Error : ", error)
      }
    }
  }
}