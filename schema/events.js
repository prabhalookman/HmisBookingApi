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
  timing_ids: [ID],
  location_id: [ID],
  workspace_ids: [ID],
  site_id: [ID],
}

extend type Query {
  getEvents: [Event]
}
`