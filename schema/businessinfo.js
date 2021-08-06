import { gql } from 'apollo-server-express';

export default gql`
type Businessinfo {
  _id: ID
  address_ids: [String],
  timing_ids: [String],
  time_zone: String,
  timeFormat: Int,
  date_format: String,
  first_day: Int,
  business_hour_start: Int,
  business_hour_end: Int,
  business_category_ids: [String],
  restrictedDays: [String],
  active: Boolean,
  accessible: Boolean,
  deleted: Boolean,
  booking_links: String,
  is_tax: Boolean,
  tax_no: String,
  tax_percentage: Int,
  policy: BusinessInfo_policy,
  site_id: String,
  workspace_ids: [String],
  created_by: String,
  created_at: String,
  updated_at: String,
  deleted_at: String
}

input businessinfoInput {
  address_ids: [String],
  timing_ids: [String],
  time_zone: String,
  timeFormat: Int,
  date_format: String,
  first_day: Int,
  business_hour_start: Int,
  business_hour_end: Int,
  business_category_ids: [String],
  restrictedDays: [String],
  active: Boolean,
  accessible: Boolean,
  deleted: Boolean,
  booking_links: String,
  is_tax: Boolean,
  tax_no: String,
  tax_percentage: Int,
  policy: BusinessInfo_policyInput,
  site_id: String,
  workspace_ids: [String],
  created_by: String,
  created_at: String,
  updated_at: String,
  deleted_at: String
}

type BusinessInfo_policy {
  appointment: String,
  cancellation: String,
  terms_and_condition: String
}

input BusinessInfo_policyInput {
  appointment: String,
  cancellation: String,
  terms_and_condition: String
}

extend type Query {
  getBusinessInfo: [Businessinfo]
}

extend type Mutation {
    addBusinessInfo(input: businessinfoInput): Businessinfo
    updateBusinessInfo(businessinfoID: ID!, input: businessinfoInput): Businessinfo
    deleteBusinessInfo(businessinfoID: ID!): Businessinfo
}
`