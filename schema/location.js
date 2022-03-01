import { gql } from 'apollo-server-express';

export default gql`
type Location {
  _id: ID
  active: Boolean,
  app_id: App,
  app_integration_need: Boolean,
  avatar_or_icon_path: String,  
  deleted: Boolean,  
  icon: String,
  name: String,
  type: String,
  type_param: Boolean
}

extend type Query {
  getLocation(workspace_id: ID, site_id: ID): [Location]
}

`