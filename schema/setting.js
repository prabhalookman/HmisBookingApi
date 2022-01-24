import { gql } from 'apollo-server-express';

export default gql`
type Setting {
  _id: ID
  advance_Booking_Period: Int,
  client_time_slot: Int,
  site_id: Site,
  workspace_id: Workspace
}

type SettingAdvance_Booking_Period {
    format: String
    value: Int
  }
extend type Query {
  getSetting: [Setting]    
}
`


