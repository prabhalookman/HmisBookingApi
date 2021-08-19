import { gql } from 'apollo-server-express';

export default gql`
type Appointment {
  _id: ID
  booking_id: String,
  customer_id: String,
  customer_name: String,
  customer_contact: String,
  customer_email: String,
  isTermAgreed: Boolean,
  isPromoAccepted: Boolean,
}

extend type Query {
  getAppointment: [Appointment]
}
`