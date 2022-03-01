import { ObjectId } from 'bson';
export default {
    Query: {
        getLocation: async (parent, args, context, info) => {
            try {
                let findObj = {  workspace_id: ObjectId(args.workspace_id) , site_id: ObjectId(args.site_id) }
                let location = await context.models.Location.find()
                return location
            } catch (error) {
                console.error("Error : ", error)
            }
        }
    },
    Location: {        
        app_id: async (locsetting, args, context) => {
          const resultData = await locsetting.populate({path: 'app_id'}).execPopulate();
          return resultData.app_id
        }
        
      }
}