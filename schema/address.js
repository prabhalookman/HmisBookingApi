import { gql } from 'apollo-server-express';

export default gql`
type Address {
  _id: ID,
  address1: String, 
  address2: String, 
  city: String, 
  state: String, 
  country: String, 
  zipCode: String, 
  latitude: String, 
  longitude: String, 
  type: String, 
  business_branch: Boolean, 
  address_phone: [address_phones], 
  email: String, 
  customer_id: String, 
  account_status: String, 
  active: Boolean, 
  accessible: Boolean, 
  delete: Boolean, 
  site_id: String, 
  workspace_ids: [String], 
  created_by: String, 
  created_at: String, 
  updated_at: String, 
  deleted_at: String, 
  default_address: Boolean, 
  business_head_ofice: Boolean 
}

type address_phones {
  name: String,
  phone_type: String,
  country_code: String,
  no: String, 
  Ext: String
}

input addressInput {
  address1: String, 
  address2: String, 
  city: String, 
  state: String, 
  country: String, 
  zipCode: String, 
  latitude: String, 
  longitude: String, 
  type: String, 
  business_branch: Boolean, 
  address_phone: [address_phones_input], 
  email: String, 
  customer_id: String, 
  account_status: String, 
  active: Boolean, 
  accessible: Boolean, 
  delete: Boolean, 
  site_id: String, 
  workspace_ids: [String], 
  created_by: String, 
  created_at: String, 
  updated_at: String, 
  deleted_at: String, 
  default_address: Boolean, 
  business_head_ofice: Boolean
}

input address_phones_input {
  name: String,
  phone_type: String,
  country_code: String,
  no: String, 
  Ext: String
}

extend type Query {
  getAddress: [Address]
}

extend type Mutation {
    addAddress(input: addressInput): Address
    updateAddress(addressID: ID!, input: addressInput): Address
    deleteAddress(addressID: ID!): Address
}
`