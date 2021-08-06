import { gql } from 'apollo-server-express';

export default gql`

enum genderType {
  MALE
  FEMALE
  BOTH
}

type Staff {
  _id: ID,
  title: String,
  name: String,
  slug: String,
  first_name: String,
  last_name: String,
  phone: [staff_phone],
  email: String,
  is_email_verified: Boolean,
  email_verified_date_time: String,
  employement_from: String,
  employement_to: String,
  experience_month: Int,
  experience_year: Int,
  gender: genderType,
  description: String,
  display_name: String,
  color_code: Int,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  showSocialShare: Boolean,
  social_network: [staff_social_network],
  sorting_id: Int,
  is_active: Boolean,
  site_owener: Boolean,
  workspace_ids: [String],
  site_id: String,
  created_by: String,
  created_at: String,
  updated_at: String,
  deleted_at: String,
  staff_detail_id: [String],
  user_id: String
}

type staff_phone {
  name: String,
  staff_type: String,
  country_code: String,
  no: Int,
  is_verified: Boolean
}

type staff_social_network {
  network: String,
  link: String
}

input staffInput {
  title: String,
  name: String,
  slug: String,
  first_name: String,
  last_name: String,
  phone: [staff_phone_input],
  email: String,
  is_email_verified: Boolean,
  email_verified_date_time: String,
  employement_from: String,
  employement_to: String,
  experience_month: Int,
  experience_year: Int,
  gender: genderType,
  description: String,
  display_name: String,
  color_code: Int,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  showSocialShare: Boolean,
  social_network: [staff_social_network_input],
  sorting_id: Int,
  is_active: Boolean,
  site_owener: Boolean,
  workspace_ids: [String],
  site_id: String,
  created_by: String,
  created_at: String,
  updated_at: String,
  deleted_at: String,
  staff_detail_id: [String],
  user_id: String  
}

input staff_phone_input {
  name: String,
  staff_type: String,
  country_code: String,
  no: Int,
  is_verified: Boolean
}

input staff_social_network_input {
  network: String,
  link: String
}

extend type Query {
  getStaffs: [Staff]
}

extend type Mutation {
    addStaff(input: staffInput): Staff
    updateStaff(staffID: ID!, input: staffInput): Staff
    deleteStaff(staffID: ID!): Staff
}
`