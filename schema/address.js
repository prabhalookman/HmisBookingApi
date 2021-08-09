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
  business_branch: Boolean, 
  address_phone: [address_phones], 
  email: String, 
  customer_id: ID,  
  workspace_ids: [ID],
  site_id: ID
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
  business_branch: Boolean, 
  address_phone: [address_phones_input], 
  email: String, 
  customer_id: ID,  
  workspace_ids: [ID],
  site_id: ID
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