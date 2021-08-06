import { gql } from 'apollo-server-express';

export default gql`
type Locationsetting {
  _id: ID  
  created_by: ID
  created_at: String  
  updated_at: String  
  deleted_at: String  
  workspace_id: Workspace
  site_id: Site
  location_id: Location
  active: Boolean
  deleted: Boolean
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

input locationSettingInput {
  created_by: ID
  created_at: String  
  updated_at: String  
  deleted_at: String  
  workspace_id: ID
  site_id: ID
  location_id: ID
  active: Boolean
  deleted: Boolean
  inperson: locationsettingInpersonInput
  oncall: locationsettingOncallInput
  video: locationsettingVideoInput
}

input locationsettingInpersonInput {
  buinsess_address: Boolean
  buinsess_id: ID
  client_address: Boolean
}

input locationsettingOncallInput {
  client_will_call : Boolean,
  staff_will_call : Boolean
}

input locationsettingVideoInput {
  integration_id: ID
  locationVideo_type: String
}

extend type Query {
  getLocationSetting: [Locationsetting]
}

extend type Mutation {
    addLocationSetting(input: locationSettingInput): Locationsetting
    updateLocationSetting(locationSettingID: ID!, input: locationSettingInput): Locationsetting
    deleteLocationSetting(locationSettingID: ID!): Locationsetting
}
`