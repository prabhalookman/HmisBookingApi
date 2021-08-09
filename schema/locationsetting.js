import { gql } from 'apollo-server-express';

export default gql`
type Locationsetting {
  _id: ID
  workspace_id: Workspace
  site_id: Site
  location_id: Location  
  inperson: LocationsettingInperson
  oncall: LocationsettingOncall
  video: LocationsettingVideo
}

type LocationsettingInperson {
  buinsess_address: Boolean
  buinsess_id: ID
  client_address: Boolean
}

type LocationsettingVideo {
  integration_id: ID
  type: String
}

type LocationsettingOncall {
  client_will_call : Boolean,
  staff_will_call : Boolean
}

extend type Query {
  getLocationSetting: [Locationsetting]
}
`