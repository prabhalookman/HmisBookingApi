import { gql } from 'apollo-server-express';

export default gql`

type Staff {
  _id: ID,
  name: String,
  description: String,
  price: String,
  title: String,
  education: String,
  experience_year: String,
  experience_month: Int,
  color_code: String,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  workspace_ids: [Workspace],
  site_id: [Site],  
  staff_detail_id: [StaffDetails]
}

extend type Query {
  getStaffs(workspace_ids: ID, site_id: ID): [Staff]
  getLocationByStaffId(workspace_ids: ID, site_id: ID, staff_id: ID):[Staff]  
}
`