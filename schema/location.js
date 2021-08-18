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
  getLocation: [Location]
}

`