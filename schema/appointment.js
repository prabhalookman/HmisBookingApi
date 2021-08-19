import { gql } from 'apollo-server-express';

export default gql`
enum availabilityType {
  INPERSON
  ONCALL
  VIDEO
}

type Appointment {
  _id: ID
  booking_id: String,
  customer_id: String,
  customer_name: String,
  customer_contact: String,
  customer_email: String,
  isTermAgreed: Boolean,
  isPromoAccepted: Boolean,

  time_zone: String,
  availability_Mode: availabilityType,

  appointment_date:String,
  start_time:String,
  start_time_expected:String,
  end_time:String,
  end_time_expected:String,
  recurring: Boolean,
  price_expected:Int,
  price_full: Int,
  canceled: Boolean,
  cancellation_reason: String, 

  add_on_ids: [ID],
  provider: ID,
  workspace_id: ID,
  staff_id: ID,
  location_id: ID,

  created_by: ID,
  created_at: String,
  updated_at: String,
  deleted_at: String,
}

input appointmentInput {
  _id: ID
  booking_id: String,
  customer_id: String,
  customer_name: String,
  customer_contact: String,
  customer_email: String,
  isTermAgreed: Boolean,
  isPromoAccepted: Boolean,

  time_zone: String,
  availability_Mode: availabilityType,

  appointment_date:String,
  start_time:String,
  start_time_expected:String,
  end_time:String,
  end_time_expected:String,
  recurring: Boolean,
  price_expected:Int,
  price_full: Int,
  canceled: Boolean,
  cancellation_reason: String, 

  add_on_ids: [ID],
  provider: ID,
  workspace_id: ID,
  staff_id: ID,
  location_id: ID,

  created_by: ID,
  created_at: String,
  updated_at: String,
  deleted_at: String,
}

extend type Query {
  getAppointment: [Appointment]
}

extend type Mutation {
  addAppointment(input: appointmentInput): Appointment
  updateAppointment(appointmentID: ID!, input: appointmentInput): Appointment
  deleteAppointment(appointmentID: ID!): Appointment
}
`