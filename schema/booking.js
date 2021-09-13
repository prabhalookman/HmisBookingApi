import { gql } from 'apollo-server-express';

export default gql`
scalar Date
type Booking {
  _id: ID
  appointment_booking_time: String,
  appointment_end_time: String,
  appointment_start_time: String,
  is_recurring: Boolean,
  timezone: String,
    
  booked_by: String,
  cost: Float,
  
  customer_ids: [Customer],
  customer_mood: String,
  customer_status: String,
  
  location_id: String,
  location_link: String,  
  integration: String,

  note: String,
  slot: Int,
  arrival_status: String,
  
  type: String,
  
  event_id: Event,
  guest_ids: [Customer],
  site_id: Site,
  add_on_ids: [Site],
  staff_id: Staff,
  workspace_id: Workspace,

  created_by: Staff,
  created_at: Date,  
  created_from: String,
  deleted: Boolean,
  deleted_at: Date,
  updated_at: Date
}

input bookingInput {
  appointment_booking_time: String,
  appointment_end_time: String,
  appointment_start_time: String,
  is_recurring: Boolean,
  timezone: String,
    
  booked_by: String,
  cost: Float,
  
  customer_ids: [ID],
  customer_mood: String,
  customer_status: String,
  
  location_id: String,
  location_link: String,  
  integration: String,

  note: String,
  slot: Int,
  arrival_status: String,
  
  type: String,
  
  event_id: ID,
  guest_ids: [ID],
  site_id: ID,
  add_on_ids: [ID],
  staff_id: ID,
  workspace_id: ID,

  created_by: ID,
  created_at: Date,  
  created_from: String,
  deleted: Boolean,
  deleted_at: Date,
  updated_at: Date
}

extend type Query {
  getBooking(workspace_id: ID, site_id: ID): [Booking]
}

extend type Mutation {
  addBooking(input: bookingInput): Booking  
}
`