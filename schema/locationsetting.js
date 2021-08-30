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
  integration_id: ID
  type: String
}

type LocationSettingOncall {
  client_will_call: Boolean,
  staff_will_call: Boolean
}

extend type Query {
  getLocationSetting: [LocationSetting]  
}
`