export default {
    Query: {
        getUsers: async (parent, args, { models }, info) => {
            try {
                let user = await models.User.find({deleted:false})
                return user
            } catch (error) {
                console.error("Error : ", error)
            }
  
        }
    },
    Mutation: {
        addUser: async (parent, args, { models }, info) => {
            try {
                let newUser = new models.User();
                let clientKeys = Object.keys(args.input);
                if (!clientKeys)
                    console.log("Error User keys")
                let i = 0;
                while (i < clientKeys.length) {
                    if (clientKeys[i] in newUser) {
                        newUser[clientKeys[i]] = args.input[clientKeys[i]]
                    }
                    i++
                }
  
                newUser = await newUser.save();
                console.log("newUser Created : ", newUser)
  
                return newUser
            } catch (error) {
                console.error("Error : ", error)
            }
  
        },
        updateUser: async (parent, args, { models }, info) => {
            try {
                let updateObj = { $set: {} };
                for (var param in args.input) {
                    updateObj.$set[param] = args.input[param];
                }
                const resultUser = await models.User.findOneAndUpdate({ _id: args.userID }, updateObj, { new: true });
  
                console.log("resultUser created : ", resultUser)
  
                return resultUser
            } catch (error) {
                console.error("Error : ", error)
            }
  
        },
        deleteUser: async (parent, args, { models }, info) => {
            try {
                args = args.userID;
                const deleteStatus = true;
                let updateObj = { deleted: deleteStatus }
  
                let resultUser = await models.User.findOneAndUpdate({ _id: args }, updateObj, { new: true });
                if (resultUser) {
                    return resultUser;
                } else {
                    console.log("Error Delet User")
                }
                return resultUser
            } catch (error) {
                console.error("Error : ", error)
            }
  
        },
    },
    User: {
        site_id: async(user, args, {models}) =>{
          const resultUser = await user.populate('site_id').execPopulate()
          return resultUser.site_id
        },
        workspace_ids: async(user, args, {models}) =>{
            const resultUser = await user.populate('workspace_ids').execPopulate()
            return resultUser.workspace_ids
          }
    }
  }