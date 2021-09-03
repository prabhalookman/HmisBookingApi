import { gql } from 'apollo-server-express';

export default gql`
type Location {
  _id: ID
  icon: String,
  icon_path: String,
  active: Boolean,
  deleted: Boolean,  
  name: String 
}

extend type Query {
  getLocation(workspace_id: ID, site_id: ID): [Location]
}

`