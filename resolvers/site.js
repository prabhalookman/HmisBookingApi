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
        },
        site: async (parent, args, { models }, info) => {
            try {
                let clientKeys = Object.keys(args.query);
                let i = 0;
                let suffixes = ["_gt", "_gte", "_lt", "_lte", "_ne", "_in", "_nin", "_exists"];
                let aggQuery = { $match: {} }
                let execQuery = [];
                let newSite = [];

                while (i < clientKeys.length) {
                    if (clientKeys[i].includes('_') && clientKeys[i] != '_id') {
                        const leng = clientKeys[i].split("_")[clientKeys[i].split("_").length - 1]
                        let nam = "$" + leng;
                        let val = replacedStr(clientKeys[i], leng)
                        aggQuery.$match[val] = { ["$" + leng]: args.query[clientKeys[i]] }
                    } else {
                        aggQuery.$match[clientKeys[i]] = args.query[clientKeys[i]]
                    }
                    i++
                }
                execQuery.push(aggQuery)
                console.log(`execQuery : ${JSON.stringify(execQuery)} `)
                let site = await Site.aggregate(execQuery)
                newSite.push(new models.Site(site[0]));
                return newSite
            } catch (error) {
                console.error("Error : ", error)
            }
        },
        sites: async (parent, args, { models }, info) => {
            try {
                let clientKeys = Object.keys(args.query);
                let i = 0;
                let suffixes = ["_gt", "_gte", "_lt", "_lte", "_ne", "_in", "_nin", "_exists"];
                let aggQuery = { $match: {} }
                let execQuery = [];

                while (i < clientKeys.length) {
                    if (clientKeys[i].includes('_') && clientKeys[i] != '_id') {
                        const leng = clientKeys[i].split("_")[clientKeys[i].split("_").length - 1]
                        let nam = "$" + leng;
                        let val = replacedStr(clientKeys[i], leng)
                        aggQuery.$match[val] = { ["$" + leng]: args.query[clientKeys[i]] }
                    } else {
                        aggQuery.$match[clientKeys[i]] = args.query[clientKeys[i]]
                    }
                    i++
                }
                execQuery.push(aggQuery)
                let sortObj = { $sort: {} }
                let limitObj = { $limit: {} }
                if (args.hasOwnProperty("sortBy")) {
                    let obj = {};
                    obj[args.sortBy] = 1
                    sortObj['$sort'] = obj
                    execQuery.push(sortObj)
                }
                if (args.hasOwnProperty("limit")) {
                    limitObj['$limit'] = args.limit
                    execQuery.push(limitObj)
                }

                console.log(`execQuery : ${JSON.stringify(execQuery)} `)
                let site = await models.Site.aggregate(execQuery)
                return site
            } catch (error) {
                console.error("Error : ", error)
            }
        }
    },
    Site: {
        created_by: async (site) => {
            let resultSite = await site.populate('created_by').execPopulate();
            return resultSite.created_by
        }
    }
}
