import { gql } from 'apollo-server-express';

export default gql`
type Events {
  _id: ID
  name: String,
  color_code: String,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  duration_hours: Number,
  duration_minutes: Number,
  timing_ids: [ID],
  location_id: [ID],
  workspace_ids: [ID],
  site_id: [ID],
}

extend type Query {
  getEvents: [Events]
}
`