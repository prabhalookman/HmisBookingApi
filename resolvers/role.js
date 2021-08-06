export default {
    Query: {
        getRoles: async (parent, args, { models }, info) => {
            try {
                let role = await models.Role.find({deleted:false})
                return role
            } catch (error) {
                console.error("Error : ", error)
            }
  
        }
    },
    Mutation: {
        addRole: async (parent, args, { models }, info) => {
            try {
                let newRole = new models.Role();
                let clientKeys = Object.keys(args.input);
                if (!clientKeys)
                    console.log("Error Role keys")
                let i = 0;
                while (i < clientKeys.length) {
                    if (clientKeys[i] in newRole) {
                        newRole[clientKeys[i]] = args.input[clientKeys[i]]
                    }
                    i++
                }
  
                newRole = await newRole.save();
                console.log("newRole Created : ", newRole)
  
                return newRole
            } catch (error) {
                console.error("Error : ", error)
            }
  
        },
        updateRole: async (parent, args, { models }, info) => {
            try {
                let updateObj = { $set: {} };
                for (var param in args.input) {
                    updateObj.$set[param] = args.input[param];
                }
                const resultRole = await models.Role.findOneAndUpdate({ _id: args.roleID }, updateObj, { new: true });
  
                console.log("resultRole created : ", resultRole)
  
                return resultRole
            } catch (error) {
                console.error("Error : ", error)
            }
  
        },
        deleteRole: async (parent, args, { models }, info) => {
            try {
                args = args.roleID;
                const deleteStatus = true;
                let updateObj = { deleted: deleteStatus }
  
                let resultRole = await models.Role.findOneAndUpdate({ _id: args }, updateObj, { new: true });
                if (resultRole) {
                    return resultRole;
                } else {
                    console.log("Error Delet Role")
                }
                return resultRole
            } catch (error) {
                console.error("Error : ", error)
            }
  
        },
    },
    Role: {
        site_id: async(role, args, {models}) =>{
          const resultRole = await role.populate('site_id').execPopulate()
          return resultRole.site_id
        },
        workspace_id: async(role, args, {models}) =>{
            const resultRole = await role.populate('workspace_id').execPopulate()
            return resultRole.workspace_id
          }
    }
  }