import { gql } from 'apollo-server-express';

export default gql`
scalar Date
type Form {
  _id: ID
  active: Boolean,
  deleted: Boolean,
  expired_date: Date,
  form_data: String,
  form_type: String,
  name: String,
  slug: String,
  view_by: String,
  site_id: Site
  workspace_ids: [Workspace]
}

`

// extend type Query {
//   getForm: [Form]  
// }