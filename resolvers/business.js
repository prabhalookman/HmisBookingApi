export default {
  Query: {
      getBusiness: async (parent, args, { models }, info) => {
          try {
              let location = await models.Business.find({deleted:false})
              return location
          } catch (error) {
              console.error("Error : ", error)
          }

      }
  }
}