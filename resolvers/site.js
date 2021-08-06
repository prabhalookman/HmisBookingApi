import { ObjectId } from 'bson';
import Site from '../model/site'

let GetQuery = async (qryData) => {
    try {
        let clientKeys = Object.keys(qryData);
        let i = 0;
        let suffixes = ["_gt", "_gte", "_lt", "_lte", "_ne", "_in", "_nin", "_exists"];
        let aggQuery = { $match: {} }
        let execQuery = [];
        let newSite = new models.Site();

        while (i < clientKeys.length) {
            if (clientKeys[i].includes('_') && clientKeys[i] != '_id') {
                const leng = clientKeys[i].split("_")[clientKeys[i].split("_").length - 1]
                let nam = "$" + leng;
                let val = replacedStr(clientKeys[i], leng)
                aggQuery.$match[val] = { ["$" + leng]: qryData[clientKeys[i]] }
            } else {
                if (clientKeys[i] == '_id') {
                    aggQuery.$match[clientKeys[i]] = ObjectId(qryData[clientKeys[i]])
                } else {
                    aggQuery.$match[clientKeys[i]] = qryData[clientKeys[i]]
                }
            }
            i++
        }
        execQuery.push(aggQuery)

        console.log(`execQuery : ${JSON.stringify(execQuery)} `)
        newSite = await models.Site.aggregate(execQuery)
        return newSite
    } catch (error) {
        console.error("Error : ", error)
    }
}

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
    Mutation: {
        insertOneSite: async (parent, args, { models }, info) => {
            try {
                let newSite = new models.Site();
                let clientKeys = Object.keys(args.data);
                if (!clientKeys)
                    console.log("Error Site keys")
                let i = 0;
                while (i < clientKeys.length) {
                    if (clientKeys[i] in newSite) {
                        newSite[clientKeys[i]] = args.data[clientKeys[i]]
                    }
                    i++
                }

                newSite = await newSite.save();
                console.log("newSite Created : ", newSite)

                return newSite
            } catch (error) {
                console.error("Error : ", error)
            }

        },

        insertManySites: async (parent, args, { models }, info) => {
            try {
                let newSite = new Site();

                newSite = await Site.insertMany(args.data);

                let Ids = []
                newSite.forEach((rec) => {
                    Ids.push(rec._id)
                })
                console.error("Ids : ", { "insertedIds": Ids })

                return { "insertedIds": Ids }
            } catch (error) {
                console.error("Error : ", error)
            }
        },
        updateOneSite: async (parent, args, { models }, info) => {
            try {
                let resultQry = await GetQuery(args.query)
                let newSite = new models.Site(resultQry[0])

                let updateObj = { $set: {} };

                for (var param in args.set) {
                    if (param == 'created_by') {
                        for (let i = 0; i < args.set[param].link.length; i++) {
                            let linkObj = args.set[param].link[i]
                            for (let j = 0; j < args.set[param].create.length; j++) {
                                let updateUserObj = { $set: {} };
                                let creteObj = args.set[param].create[j]
                                let creteObjKeys = Object.keys(args.set[param].create[j])
                                for (let k = 0; k < creteObjKeys.length; k++) {
                                    updateUserObj.$set[creteObjKeys[k]] = creteObj[creteObjKeys[k]];
                                }
                                const resultUser = await models.User.findOneAndUpdate({ _id: linkObj }, updateUserObj, { new: true });
                                updateObj.$set["created_by"] = resultUser.id
                                console.log("resultUser created : ", resultUser.id)
                            }
                        }

                    } else {
                        updateObj.$set[param] = args.set[param];
                    }
                }

                newSite = await models.Site.findOneAndUpdate({ _id: newSite._id }, updateObj, { multi: true, new: true });
                return newSite
            } catch (error) {
                console.error("Error : ", error)
            }
        },
        updateManySites: async (parent, args, { models }, info) => {
            try {
                let resultQry = await GetQuery(args.query)

                let updateObj = { $set: {} };
                for (var param in args.set) {
                    updateObj.$set[param] = args.set[param];
                }
                let matched = []

                for (let i = 0; i < resultQry.length; i++) {
                    let result = await models.Site.findOneAndUpdate({ _id: resultQry[i]._id }, updateObj, { multi: true, new: true });
                    matched.push(result)
                }
                /*
                    processedIds.forEach(function(id)){
                        Model.update({ _id: id}, { $set: { status: "processed" } }, callback);
                    });

                    Model.updateMany(
                        { _id: { $in: processedIds } }, 
                        { $set: { status: "processed" } }, 
                        callback
                    );
                */

                return matched

            } catch (error) {
                console.error("Error : ", error)
            }
        },
        upsertOneSite: async (parent, args, { models }, info) => {
            try {
                let resultQry = await GetQuery(args.query)
                let newSite = new models.Site(resultQry[0])

                let updateObj = { $set: {} };
                for (var param in args.data) {
                    updateObj.$set[param] = args.data[param];
                }

                newSite = await models.Site.findOneAndUpdate({ _id: newSite._id }, updateObj, { new: true, upsert: true });
                return newSite
            } catch (error) {
                console.error("Error : ", error)
            }

        },
        replaceOneSite: async (parent, args, { models }, info) => {
            try {
                let resultQry = await GetQuery(args.query)
                let newSite = new models.Site(resultQry[0])

                let updateObj = { $set: {} };
                let resultKeys = Object.keys(resultQry[0])
                var filteredAry = resultKeys.filter(function (e) { return (e !== '_id' || e !== '_v') })

                filteredAry.forEach((res) => {
                    for (var param in args.data) {
                        if (filteredAry.includes(param) || args.data.includes(res)) {
                            updateObj.$set[param] = args.data[param];
                        } else {
                            updateObj.$set[param] = null
                        }
                    }
                })

                newSite = await models.Site.findOneAndUpdate({ _id: newSite._id }, updateObj, { new: true, upsert: true });
                return newSite
            } catch (error) {
                console.error("Error : ", error)
            }

        },
        deleteOneSite: async (parent, args, { models }, info) => {
            try {
                let resultQry = await GetQuery(args.query)
                let newSite = new models.Site(resultQry[0])

                const deleteStatus = true;
                let updateObj = { deleted: deleteStatus }

                let resultSite = await models.Site.findOneAndUpdate({ _id: newSite._id }, updateObj, { new: true });
                if (resultSite) {
                    return resultSite;
                } else {
                    console.log("Error Delet Site")
                }
                return resultSite
            } catch (error) {
                console.error("Error : ", error)
            }

        },
        deleteManySites: async (parent, args, { models }, info) => {
            try {
                let resultQry = await GetQuery(args.query)

                const deleteStatus = true;
                let updateObj = { deleted: deleteStatus }

                let matched = []

                for (let i = 0; i < resultQry.length; i++) {
                    let result = await models.Site.findOneAndUpdate({ _id: resultQry[i]._id }, updateObj, { multi: true, new: true });
                    matched.push(result)
                }

                return matched

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

// Local Functions
function replacedStr(str, suffix) {
    const val = str.substring(0, str.indexOf(suffix, str.length - suffix.length) - 1);
    console.log(`${str} - ${suffix} - ${val} `)
    return val
}