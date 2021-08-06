import { gql } from 'apollo-server-express';

export default gql`
type Location {
  _id: ID
  type: String
  type_param: Boolean  
  app_integration_need: Boolean
  icon: String
  icon_path: String
  active: Boolean
  deleted: Boolean
  created_at: String
  updated_at: String
  deleted_at: String
  name: String
}

input locationInput {
  type: String
  type_param: Boolean  
  app_integration_need: Boolean
  icon: String
  icon_path: String
  active: Boolean
  deleted: Boolean
  created_at: String
  updated_at: String
  deleted_at: String
  name: String
}

extend type Query {
  getLocation: [Location]
}

extend type Mutation {
    addLocation(input: locationInput): Location
    updateLocation(locationID: ID!, input: locationInput): Location
    deleteLocation(locationID: ID!): Location
}
`