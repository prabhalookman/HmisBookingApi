/*
type Booking {
  _id: ID
  appointment_booking_time: DateTime,
  appointment_end_time: DateTime,
  appointment_start_time: DateTime,
  appointment_time_before_reschedule: [DateTime],
  extra_time_is_blocking: Boolean,  
    
  booked_by: String,
  cost: Float,
  amount_paid: Float,
  
  customer_ids: [Customer],
  customer_mood: String,
  customer_status: String,
  
  discount_amount: Float,
  discount_applied: Boolean,
  discount_available: Boolean,
  discount_code: String,
  discount_id: Discountcoupon,
  duration_minutes: Int,
  
  gift_card_amount: Float,
  gift_card_applied: Boolean,
  gift_card_available: Boolean,
  gift_card_id: Giftcard,
  
  location_id: String,
  location_link: String,  
  integration: String,
  
  is_approved: Boolean,
  is_asked_for_review: Boolean,
  is_cancelled: Boolean,
  is_failed: Boolean,
  is_multi_service: Boolean,
  is_offer_applied: Boolean,
  is_offer_available: Boolean,
  is_paid: Boolean,
  is_recurring: Boolean,
  is_rescheduled: Boolean,
  is_review_given: Boolean,
  
  note: String,
  offer_amount: Float,  
  payment_mode_id: Int,
  platform: String,
  price_type: String,  
  reference: String,
  resource_id: Int,
  room_id: String,
  slot: Int,
  arrival_status: String,
  timezone: String,  
  type: String,
  
  event_id: Event,
  guest_ids: [Customer],
  order_id: Order,
  progress: [BookingProgress],
  site_id: Site,
  add_on_ids: [Site],
  staff_id: Staff,
  assignee_id: [Staff],
  transfered_id: [Staff],
  workspace_id: Workspace,

  created_by: Staff,
  created_at: DateTime,  
  created_from: String,
  deleted: Boolean,
  deleted_at: DateTime,
  updated_at: DateTime
}

type Discuountcoupon {
  name: String,
  coupon_code: String,
  discount_amount: Float,
  discount_limitation: String,
  discount_percentage: Float,
  discount_type: String,

  maximum_discount_amount: Float,
  maximum_discounted_quantity: Int,

  is_cumulative: Boolean,
  is_enabled: Boolean,
  limitation_times: Int,
  requires_coupon_code: Boolean,
  use_percentage: Boolean,
  reused: Boolean,
  start_date: Date,
  end_date: Date,
  
  workspace_ids: [Workspace],
  site_id: Site,

  created_at: Date,
  created_by: Staff,
  deleted_at: Date,
  updated_at: Date,
}

whatever need for booking from page , Like Start Date and End Date,Slot,Service,Staff,Location,Customer

1.Staff query
2.Service Query
3.Customer Insert
4.Booking Insert thats all

5.Booking query also need for block the already booking dates

*/

