import { gql } from 'apollo-server-express';

export default gql`

type Staff {
  _id: ID,
  name: String,
  color_code: String,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  workspace_ids: [Workspace],
  site_id: [Site],  
  staff_detail_id: [StaffDetails]
}

extend type Query {
  getStaffs: [Staff]
  getLocationByStaffId(workspace_ids: ID, site_id: ID, staff_id: ID):[Staff]  
}
`