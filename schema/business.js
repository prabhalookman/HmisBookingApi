import { gql } from 'apollo-server-express';

export default gql`
type Business {
  _id: ID
  business_info_ids: [BusinessInfo],    
  display_name: String,    
  name: String,    
  site_id: Site,
  workspace_id: [Workspace]
}
extend type Query {
    getBusiness: [Business]
}
`
/*

*/