import { gql } from 'apollo-server-express';

export default gql`
scalar Date
type Booking {
  _id: ID
  add_on_ids: [AddOn]
  amount_paid: Int
  appointment_booking_time: Date
  appointment_end_time: Date
  appointment_start_time: Date
  appointment_time_before_reschedule: [Date]
  repeat_upto_date:Date
  repeat_on: String,
  booked_by: String,
  progress: [book_progress],
  answer_id:[Answer],

  cost: Int
  created_at: String
  created_by: Staff
  created_from: String
  customer_ids: [Customer]
  customer_mood: String
  customer_status: String
  Is_cancelled: Boolean
  deleted: Boolean
  deleted_at: String

  buffer_after_min: Int,
  buffer_before_min: Int,
  duration_hours: Int,
  duration_minutes: Int,
  event_id: Events

  is_recurring: Boolean
  is_rescheduled: Boolean
  is_review_given: Boolean
  location_link: String
  location_setting_id: LocationSetting
  note: String

  site_id: Site
  slot: Int
  staff_id: Staff
  timezone: String
  transfered_id: [Staff]
  type: String
  updated_at: String
  workspace_id: Workspace
  }

  type book_progress {
    date_time: Date,
    status: String
  }

  input bookingInput {  
  add_on_ids: [ID]
  amount_paid: Int
  appointment_booking_time: String
  appointment_end_time: String
  appointment_start_time: String
  appointment_time_before_reschedule: [Date]
  repeat_upto_date:Date
  repeat_on: String,
  booked_by: String,
  progress: [book_progress_input],
  answer_id: ID

  cost: Float
  created_at: String
  created_by: ID
  created_from: String
  customer_ids: [ID]
  customer_mood: String
  customer_status: String
  deleted: Boolean
  Is_cancelled: Boolean
  deleted_at: String

  buffer_after_min: Int,
  buffer_before_min: Int,
  duration_hours: Int,
  duration_minutes: Int,
  event_id: ID

  is_recurring: Boolean
  is_rescheduled: Boolean
  is_review_given: Boolean
  location_link: String
  location_setting_id: ID
  note: String

  site_id: ID
  slot: Int
  staff_id: ID
  timezone: String
  transfered_id: [ID]
  type: String
  updated_at: String
  workspace_id: ID
}

input bookingIn {  
  availablity:bookingInput
  customer:customerInput
}
input book_progress_input {
  date_time: Date,
  status: String
}

input booking_available_in {
  location_setting_id:ID
  timezone: String
  appointment_booking_time: String
  is_recurring: Boolean
  slot: Int
}

extend type Query {
getBooking(workspace_id: ID, site_id: ID): [Booking]
getBookingById(workspace_id: ID, site_id:ID, booking_id: ID ):[Booking]
getBookingByStaff(workspace_id: ID!, site_id:ID!, staff_id: ID! ):[Booking]
getBookingByEvent(workspace_id: ID!, site_id:ID!, event_id: ID! ):[Booking]
}

extend type Mutation {
addBooking(input: bookingIn): Booking  
rescheduleBooking(
  appointment_id: ID!,
  appointment_start_time: String!
  appointment_end_time: String!
  ): Booking
}
 `

// /*

// rescheduleBooking(
//   appointment_id: String!,
//   appointment_start_time: String!
//   booking_id: ID!
//   workspace_id: ID!, 
//   site_id: ID!, 
//   staff_ids: ID!, 
//   event: [ID!], 
//   date: String!, 
//   locationName: [String!],
//   locationSettingId: [ID]): Availablilities
// }

// arrival_status: String
// assignee_id: [Staff]
// booked_by: String
// booking_id: Int

// discount_amount: Int
// discount_applied: Boolean
// discount_available: Boolean
// discount_code: String
// discount_id: Discountcoupon

// extra_time_is_blocking: Boolean
// gift_card_amount: Int
// gift_card_applied: Boolean
// gift_card_available: Boolean
// gift_card_id: Giftcard
// guest_ids: [Customer]
// integration: String
// is_approved: Boolean
// is_asked_for_review: Boolean
// Is_cancelled: Boolean
// is_failed: Boolean
// is_multi_service: Boolean
// is_offer_applied: Boolean
// is_offer_available: Boolean
// is_paid: Boolean

// offer_amount: Int
// order_id: Order
// payment_mode_id: Int
// platform: String
// price_type: String
// progress: [BookingProgress]
// reference: String
// resource_id: Int
// room_id: String
// */