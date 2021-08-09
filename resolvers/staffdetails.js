export default {
  Query: {
    getStaffDetails: async (parent, args, { models }, info) => {
          try {
              let staffDetails = await models.StaffDetails.find({deleted:false})
              return staffDetails
          } catch (error) {
              console.error("Error : ", error)
          }

      }
  }
}