import { gql } from 'apollo-server-express';

export default gql`
type Business {
  _id: ID
  name: String,  
  site_id: Site,
  workspace_ids: Workspace,
  address_ids: [Address],
}

extend type Query {
    getBusiness: [Business]
}
`