import { gql } from 'apollo-server-express';

export default gql`
type Customer {
  _id: ID
  name: String,
  email: String,
  email_verified_date_time: String,
  phone: [CustomerPhone],
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  display_name: String,  
  address_id: Address
}

type CustomerPhone {
  country_code: String
  is_verified: Boolean
  name: String
  no: String
  type: String
}

input customerInput {
  _id: ID
  name: String,
  email: String,
  email_verified_date_time: String,
  phone: [customerPhoneInput],
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  display_name: String,  
  address_id: ID
}

input customerPhoneInput {
  country_code: String
  is_verified: Boolean
  name: String
  no: String
  type: String
}

extend type Query {
    getCustomer: [Customer]
}

extend type Mutation {
  addCustomer(input: customerInput): Customer
}
`