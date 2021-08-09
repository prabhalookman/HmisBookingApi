export default {
  Query: {
      getStaffs: async (parent, args, { models }, info) => {
          try {
              let staff = await models.Staff.find({deleted:false})
              return staff
          } catch (error) {
              console.error("Error : ", error)
          }

      }
  }
}