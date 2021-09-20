import { gql } from 'apollo-server-express';

export default gql`
type AddOn {
  _id: ID
  active: Boolean
  delete: Boolean
  event_ids: [Event]
  name: String
  once_per_order: Boolean
  price: Float
  show_multiple_time: Boolean
  site_id: Site
  variant: [AddonVariant]
  workspace_ids: [Workspace]
}

type AddonVariant {
    name: String
    price: Float
}

extend type Query {
  getAddOns: [AddOn]
}
`