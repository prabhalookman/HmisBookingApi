import { gql } from 'apollo-server-express';

export default gql`
type Events {
  _id: ID
  name: String,
  event_one_on_one: Boolean,
  event_group: Boolean,
  event_round_robin: Boolean,
  event_collective: Boolean,
  event_type: String,
  description: String,
  active: Boolean,
  deleted: Boolean,
  color_code: String,
  display_name: String,
  booking_url: String,
  is_recurring: Boolean,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  event_category_id: String,
  allow_waitlist: Boolean,
  staff_conformation: Boolean,
  allow_multiple_appointment: Boolean,
  no_of_multiple_appointment: Int,
  display_booking_page: Boolean,
  prefered_gender: String,
  display_order: Int,
  commission_enabled: Boolean,
  extra_time_in_seconds: Int,
  extra_time_type: String,
  room_required: Boolean,
  resource_required: Boolean,
  room_id: String,
  rosource_id: String,
  sorting_id: Int,  
  voucher_expiration_period: String,
  limit_booking: Boolean,
  booking_limit: Int,
  occupancy: Int,
  running_status: Boolean,
  scheduling_notice: events_scheduling_notice,
  time_zone: String,
  duration_hours: Int,
  duration_minutes: Int,
  buffer_before_min: Int,
  buffer_after_min: Int,
  latest_appointment: Int,
  advanced_appointment: Int,
  hide_duration_on_booking_page: Boolean,
  enable_appointment_at_fixed_time: Boolean,
  multiple_duration: Boolean,
  max_duration_in_seconds: Int,
  min_duration_in_seconds: Int,
  date_range_enable: Boolean,
  availability_range: event_avilability_range,
  currency: String,
  enable_accept_payments: Boolean,
  accept_deposits: Boolean,
  payment_type: String,
  deposit: Float,
  taxable: Boolean,
  tax_percentage: Float,
  require_payment_for_events: Boolean,
  payment_show_in_booking_page: Boolean,
  staff_commission: Boolean,
  staff_commission_percentage: Float,
  voucher_enabled: Boolean,
  multiple_pricing_enabled: Boolean,
  voucher_id: String,
  service_pricing_by_staff_enabled: Boolean,
  advance_pricing_ids: [String],
  timing_ids: [String],
  staff_ids: [String],
  add_on_ids: [String],
  included: [event_included],
  excluded: [event_excluded],
  site_id: String,
  created_by: String,
  created_at: String,
  updated_at: String,
  deleted_at: String,
  workspace_id: String,
  advanced_pricing: Boolean
}

type events_scheduling_notice {
  limit: Int,
  sch_notice_type: String
}

type event_avilability_range {
  date_range: avail_range_date_range,
  advance: avail_range_advance,
  Indefinitely: Boolean
}

type avail_range_date_range {
  from: String,
  to: String
}

type avail_range_advance {
  no: Int,
  advance_type: String
}

type event_included {
    name: String,
    description: String,
    included_type: String,
    extra_price: Boolean,
    price: Float
}

type event_excluded  {
    name: String,
    description: String,
    excluded_type: String,
    extra_price: Boolean,
    price: Float
}

input eventInput {
  name: String,
  event_one_on_one: Boolean,
  event_group: Boolean,
  event_round_robin: Boolean,
  event_collective: Boolean,
  event_type: String,
  description: String,
  active: Boolean,
  deleted: Boolean,
  color_code: String,
  display_name: String,
  booking_url: String,
  is_recurring: Boolean,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  event_category_id: String,
  allow_waitlist: Boolean,
  staff_conformation: Boolean,
  allow_multiple_appointment: Boolean,
  no_of_multiple_appointment: Int,
  display_booking_page: Boolean,
  prefered_gender: String,
  display_order: Int,
  commission_enabled: Boolean,
  extra_time_in_seconds: Int,
  extra_time_type: String,
  room_required: Boolean,
  resource_required: Boolean,
  room_id: String,
  rosource_id: String,
  sorting_id: Int,  
  voucher_expiration_period: String,
  limit_booking: Boolean,
  booking_limit: Int,
  occupancy: Int,
  running_status: Boolean,
  scheduling_notice: events_scheduling_notice_Input,
  time_zone: String,
  duration_hours: Int,
  duration_minutes: Int,
  buffer_before_min: Int,
  buffer_after_min: Int,
  latest_appointment: Int,
  advanced_appointment: Int,
  hide_duration_on_booking_page: Boolean,
  enable_appointment_at_fixed_time: Boolean,
  multiple_duration: Boolean,
  max_duration_in_seconds: Int,
  min_duration_in_seconds: Int,
  date_range_enable: Boolean,
  availability_range: event_avilability_range_Input,
  currency: String,
  enable_accept_payments: Boolean,
  accept_deposits: Boolean,
  payment_type: String,
  deposit: Float,
  taxable: Boolean,
  tax_percentage: Float,
  require_payment_for_events: Boolean,
  payment_show_in_booking_page: Boolean,
  staff_commission: Boolean,
  staff_commission_percentage: Float,
  voucher_enabled: Boolean,
  multiple_pricing_enabled: Boolean,
  voucher_id: String,
  service_pricing_by_staff_enabled: Boolean,
  advance_pricing_ids: [String],
  timing_ids: [String],
  staff_ids: [String],
  add_on_ids: [String],
  included: [event_included_Input],
  excluded: [event_excluded_Input],
  site_id: String,
  created_by: String,
  created_at: String,
  updated_at: String,
  deleted_at: String,
  workspace_id: String,
  advanced_pricing: Boolean  
}

input events_scheduling_notice_Input {
  limit: Int,
  sch_notice_type: String
}

input event_avilability_range_Input {
  date_range: avail_range_date_range_Input,
  advance: avail_range_advance_Input,
  Indefinitely: Boolean
}

input avail_range_date_range_Input {
  from: String,
  to: String
}

input avail_range_advance_Input {
  no: Int,
  advance_type: String
}

input event_included_Input {
    name: String,
    description: String,
    included_type: String,
    extra_price: Boolean,
    price: Float
}

input event_excluded_Input  {
    name: String,
    description: String,
    excluded_type: String,
    extra_price: Boolean,
    price: Float
}

extend type Query {
  getEvents: [Events]
}

extend type Mutation {
    addEvent(input: eventInput): Events
    updateEvent(eventID: ID!, input: eventInput): Events
    deleteEvent(eventID: ID!): Events
}
`