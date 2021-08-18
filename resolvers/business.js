export default {
  Query: {
      getBusiness: async (parent, args, { models }, info) => {
          try {
              let business = await models.Business.find({deleted:false})
              return business
          } catch (error) {
              console.error("Error : ", error)
          }

      }
  }
}