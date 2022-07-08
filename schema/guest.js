import { gql } from 'apollo-server-express';

export default gql`
type Guest {
  name: String,
  slug: String,
  first_name: String,
  last_name: String,
  phone: [Guest_Phone],
  email: String,
  is_email_verified: Boolean,
  email_verified_date_time: Date,
  registration_date: Date,
  source: String,
  registeredUsing: String,
  booking_ids: [Booking],
  invited_customer_id: [Customer],
  color_code: String,
  site_id: Site,
  workspace_ids: [Workspace]
}

type Guest_Phone {
    is_verified: Boolean,
    country_code: String,
    name: String,
    no: String,
    type: String,
}

input guestInput {
    name: String,
    slug: String,
    first_name: String,
    last_name: String,
    phone: [Guest_Phone_Input],
    email: String,
    is_email_verified: Boolean,
    email_verified_date_time: Date,
    registration_date: Date,
    source: String,
    registeredUsing: String,
    booking_ids: [ID],
    invited_customer_id: [ID],
    color_code: String,
    site_id: ID,
    workspace_ids: [ID]
}
input Guest_Phone_Input {
    is_verified: Boolean,
    country_code: String,
    name: String,
    no: String,
    type: String,
}

extend type Query {
  getGuest: [Guest]
}
`