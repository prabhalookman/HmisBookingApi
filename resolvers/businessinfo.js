export default {
  Query: {
      getBusinessInfo: async (parent, args, { models }, info) => {
          try {
              let businessInfo = await models.BusinessInfo.find({deleted:false})
              return businessInfo
          } catch (error) {
              console.error("Error : ", error)
          }

      }
  }
}