import { gql } from 'apollo-server-express';

export default gql`
type LocationSetting {
  _id: ID
  workspace_id: Workspace
  site_id: Site
  location_id: Location  
  inperson: LocationSettingInperson
  oncall: LocationSettingOncall
  video: LocationSettingVideo  
}

type LocationSettingInperson {
  buinsess_address: Boolean
  buinsess_id: ID
  client_address: Boolean
}

type LocationSettingVideo {
  integration_id: String
  video_type: String
}

type LocationSettingOncall {
  client_will_call: Boolean,
  staff_will_call: Boolean
}

extend type Query {
  getLocationSetting(workspace_id: ID, site_id: ID): [LocationSetting]  
  getLocationSettingById(workspace_id: ID, site_id: ID, location_id: [ID]): [LocationSetting]  
  getStaffEventLocationSettings(workspace_id: ID!, site_id: ID!, event_id: ID!,staff_id: ID!, date: String!): [LocationSetting]
}
`