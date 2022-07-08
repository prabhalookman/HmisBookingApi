import { gql } from 'apollo-server-express';

export default gql`
type Customer {
  _id: ID  
  address_id: Address,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  booking_ids: [Booking],
  guest_ids: [Guest],
  color_code: String,
  date_of_birth: String,
  description: String,

  display_name: String,
  email: String,
  email_verified_date_time: String,
  first_name: String,
  gender: String,
  
  is_email_verified: Boolean,
  last_name: String,
  name: String,
  
  registeredUsing: String,
  registration_date: String,
  slug: String,
  source: String,
  timezone: String

  phone: [CustomerPhone],  
}
type CustomerPhone {
    country_code: String
    is_verified: Boolean
    name: String
    no: String
    
  }

input customerInput {
  address_id: ID,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  booking_ids: [ID],
  guest_ids: [ID],
  color_code: String,
  date_of_birth: String,
  description: String,
  
  display_name: String,
  email: String,
  email_verified_date_time: String,
  first_name: String,
  gender: String,
  
  is_email_verified: Boolean,
  last_name: String,
  name: String,
  phone: [customerPhoneInput],  
  
  registeredUsing: String,
  registration_date: String,
  slug: String,
  source: String,
  timezone: String
}  

input customerPhoneInput {
  country_code: String
  is_verified: Boolean
  name: String
  no: String
  
}


extend type Query {
    getCustomer(workspace_ids: ID, site_id: ID, staff_id: ID): [Customer]
}

extend type Mutation {
  addCustomer(input: customerInput): Customer
}
`
/*

type: String
*/