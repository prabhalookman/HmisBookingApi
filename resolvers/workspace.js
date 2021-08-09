export default {
  Query: {
    getWorkspace: async (parent, args, { models }, info) => {
      try {
        let workspace = await models.Workspace.find({deleted:false})
        return workspace
      } catch (error) {
        console.error("Error : ", error)
      }

    }
  },
  Workspace: {
    site_id: async(wrkspace, args, {models}) =>{
      const resultworkspace = await wrkspace.populate('site_id').execPopulate()
      return resultworkspace.site_id
    }
  }
}