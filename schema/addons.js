import { gql } from 'apollo-server-express';

export default gql`
type AddOn {
  _id: ID
  name: String, 
  price: Float, 
  variant: [addon_vaiant],
  show_multiple_time: Boolean,
  once_per_order: Boolean,
  event_ids: [ID],
  workspace_ids: [ID],  
  site_id: ID
}

type addon_vaiant {
	name: String,
	price: Float
}

extend type Query {
  getAddOns: [AddOn]
}
`