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

extend type Query {
  getAddress: [Address]
}

`