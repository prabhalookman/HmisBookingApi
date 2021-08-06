import { gql } from 'apollo-server-express';

export default gql`
type StaffDetails {
  _id: ID,
  is_service_provider: Boolean,
  booking_url: String,
  email_signature: String,
  deafult_calendar_view: String,
  business_timings: Boolean,
  business_ids: [String],
  staff_commission: Boolean,
  paid_plan_commission: Boolean,
  product_commission: String,
  service_commission: String,
  voucher_commission: String,
  is_sync_enabled: Boolean,
  sync: [staff_sync],
  workspace_id: [String],
  created_by: String,
  created_at: String,
  updated_at: String,
  deleted_at: String,
  site_id: String,
  address_ids: [String],
  timing_ids: [String],
  active: Boolean,
  delete: Boolean,
  invitation_status_accept: Boolean,
  is_login: Boolean,
  sorting_id: Int,
  event_ids: [String]
}

type staff_sync {
  staff_syc_type: String,
  key: String
}

input staffDetailsInput {
  is_service_provider: Boolean,
  booking_url: String,
  email_signature: String,
  deafult_calendar_view: String,
  business_timings: Boolean,
  business_ids: [String],
  staff_commission: Boolean,
  paid_plan_commission: Boolean,
  product_commission: String,
  service_commission: String,
  voucher_commission: String,
  is_sync_enabled: Boolean,
  sync: [staff_sync_input],
  workspace_id: [String],
  created_by: String,
  created_at: String,
  updated_at: String,
  deleted_at: String,
  site_id: String,
  address_ids: [String],
  timing_ids: [String],
  active: Boolean,
  delete: Boolean,
  invitation_status_accept: Boolean,
  is_login: Boolean,
  sorting_id: Int,
  event_ids: [String]
}

input staff_sync_input {
  staff_syc_type: String,
  key: String
}

extend type Query {
  getStaffDetails: [StaffDetails]
}

extend type Mutation {
    addStaffDetails(input: staffDetailsInput): StaffDetails
    updateStaffDetails(staffDetailsID: ID!, input: staffDetailsInput): StaffDetails
    deleteStaffDetails(staffDetailsID: ID!): StaffDetails
}
`