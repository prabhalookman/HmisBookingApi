export default {
  Query: {
    getWorkspace: async (parent, args, context, info) => {
      try {
        let workspace = await context.models.Workspace.find({})
        return workspace
      } catch (error) {
        console.error("Error : ", error)
      }
    }
  },
  Workspace: {
    site_id: async (wrkspace, args, context) => {
      const resultworkspace = await wrkspace.populate('site_id').execPopulate()
      return resultworkspace.site_id
    }
  }
}