import { gql } from 'apollo-server-express';

export default gql`
scalar Date
type Booking {
  _id: ID
    add_on_ids: [Addon]
    amount_paid: Int
    appointment_booking_time: String
    appointment_end_time: String
    appointment_start_time: String
    appointment_time_before_reschedule: [String]
    
    cost: Int
    created_at: String
    created_by: Staff
    created_from: String
    customer_ids: [Customer]
    customer_mood: String
    customer_status: String
    deleted: Boolean
    deleted_at: String
    
    duration_minutes: Int
    event_id: Event
    
    is_recurring: Boolean
    is_rescheduled: Boolean
    is_review_given: Boolean
    location_link: String
    location_setting_id: Locationsetting
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

extend type Query {
  getBooking(workspace_id: ID, site_id: ID): [Booking]
}

extend type Mutation {
  addBooking(input: bookingInput): Booking  
}
`

/*
arrival_status: String
assignee_id: [Staff]
booked_by: String
booking_id: Int

discount_amount: Int
discount_applied: Boolean
discount_available: Boolean
discount_code: String
discount_id: Discountcoupon

extra_time_is_blocking: Boolean
gift_card_amount: Int
gift_card_applied: Boolean
gift_card_available: Boolean
gift_card_id: Giftcard
guest_ids: [Customer]
integration: String
is_approved: Boolean
is_asked_for_review: Boolean
is_cancelled: Boolean
is_failed: Boolean
is_multi_service: Boolean
is_offer_applied: Boolean
is_offer_available: Boolean
is_paid: Boolean

offer_amount: Int
order_id: Order
payment_mode_id: Int
platform: String
price_type: String
progress: [BookingProgress]
reference: String
resource_id: Int
room_id: String
*/