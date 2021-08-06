import { gql } from 'apollo-server-express';

export default gql`
type AddOn {
  _id: ID
  name: String, 
  price: Float, 
  variant: [addon_vaiant],
  show_multiple_time: Boolean,
  once_per_order: Boolean,
  event_ids: [String],
  workspace_ids: [String],
  active: Boolean,
  deleted: Boolean,
  site_id: String
}

type addon_vaiant {
	name: String,
	price: Float
}

input addOnInput {
  name: String, 
  price: Float, 
  variant: [addon_vaiant_Input],
  show_multiple_time: Boolean,
  once_per_order: Boolean,
  event_ids: [String],
  workspace_ids: [String],
  active: Boolean,
  deleted: Boolean,
  site_id: String
}

input addon_vaiant_Input {
	name: String,
	price: Float
}

extend type Query {
  getAddOns: [AddOn]
}

extend type Mutation {
    addAddOn(input: addOnInput): AddOn
    updateAddOn(addOnID: ID!, input: addOnInput): AddOn
    deleteAddOn(addOnID: ID!): AddOn
}
`