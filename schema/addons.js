import { gql } from 'apollo-server-express';

export default gql`
type AddOn {
  _id: ID
  name: String, 
  price: Float, 
  variant: [addon_vaiant],
  show_multiple_time: Boolean,
  once_per_order: Boolean,
  event_ids: [Event],
  workspace_ids: [Workspace],  
  site_id: [Site]
}

type addon_vaiant {
	name: String,
	price: Float
}

extend type Query {
  getAddOns: [AddOn]
}
`