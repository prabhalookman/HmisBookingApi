import { gql } from 'apollo-server-express';

export default gql`
type Business {
  _id: ID
  name: String,  
  site_id: ID,
  workspace_ids: ID,  
  address_ids: [ID],
}

extend type Query {
    getBusiness: [Business]
}
`