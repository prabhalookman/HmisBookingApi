import { gql } from 'apollo-server-express';

export default gql`
type Event {
  _id: ID
  name: String,
  color_code: String,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  duration_hours: Int,
  duration_minutes: Int,
  timing_ids: [Timings],
  location_id: [Location],
  workspace_ids: [Workspace],
  site_id: [Site],
  staff_ids: [Staff],
}

extend type Query {
  getEvents(workspace_id: ID, site_id: ID): [Event]
  getEventsDetailByStaff(workspace_id: ID, site_id: ID, staff_ids: ID): [Event]
}
`