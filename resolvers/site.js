import { ObjectId } from 'bson';
import Site from '../model/site'

export default {
    Query: {
        getSite: async (parent, args, { models }, info) => {
            try {
                let site = await models.Site.find({})
                return site
            } catch (error) {
                console.error("Error : ", error)
            }
        }
    },
    Site: {
        // created_by: async (site) => {
        //     let resultSite = await site.populate('created_by').execPopulate();
        //     return resultSite.created_by
        // }
    }
}
