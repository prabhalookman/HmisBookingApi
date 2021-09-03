export default {
    Query: {
        getStaffs: async (parent, args, { models }, info) => {
            try {
                let staff = await models.Staff.find({  workspace_ids: args.workspace_ids, site_id:args.site_id, _id:args.staff_id })
                return staff
            } catch (error) {
                console.error("Error : ", error)
            }
        },
        getLocationByStaffId: async (parent, args, { models }, info) => {
          try {
            let resultStaff = await models.Staff.find({  workspace_ids: args.workspace_ids, site_id:args.site_id, _id:args.staff_id })
            return resultStaff
          } catch (error) {
            console.error("Error : ", error)
          }
        }
    },
    Staff: {        
        workspace_ids: async (staff) => {
            let resultStaff = await staff.populate('workspace_ids').execPopulate();
            return resultStaff.workspace_ids
        },
        site_id: async (staff) => {
            let resultStaff = await staff.populate('site_id').execPopulate();
            return resultStaff.site_id
        },
        staff_detail_id: async (staff) => {
          let resultStaff = await staff.populate('staff_detail_id').execPopulate();
          return resultStaff.staff_detail_id
        }        
    }
}