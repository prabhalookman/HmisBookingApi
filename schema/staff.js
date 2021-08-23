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
  timing_ids: [Timings],
  location_id: [Location]
}

extend type Query {
  getStaffs: [Staff]
}
`