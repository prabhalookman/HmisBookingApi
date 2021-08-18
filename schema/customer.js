import { gql } from 'apollo-server-express';

export default gql`
type Customer {
  _id: ID
  name: String,  
  site_id: ID,
  workspace_ids: ID,  
  address_ids: [ID],
}

extend type Query {
    getCustomer: [Customer]
}
`