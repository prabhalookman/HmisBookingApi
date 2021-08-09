export default {
  Query: {
      getBusinessInfo: async (parent, args, { models }, info) => {
          try {
              let location = await models.BusinessInfo.find({deleted:false})
              return location
          } catch (error) {
              console.error("Error : ", error)
          }

      }
  }
}