import { gql } from 'apollo-server-express';

export default gql`
type Business {
  _id: ID
  type: String,
  business_branch: String,
  display_name: String,
  description: String,
  name: String,
  staff_size: Int,
  color_code: String,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  active: Boolean,
  accessible: Boolean,
  deleted: Boolean,
  email_signature: String,
  showSocialShare: Boolean,
  social_network: [BusinessSocial_network],
  site_id: String,
  workspace_ids: [String],
  created_by: String,
  created_at: String,
  updated_at: String,
  deleted_at: String,
  business_info_ids: [String],
  web_url: String
}
type BusinessSocial_network {
  network: String
  link: String  
}

input BusinessSocial_networkInput {
  network: String
  link: String  
}

input businessInput {
  type: String,
  display_name: String,
  business_branch: String,
  description: String,
  name: String,
  staff_size: Int,
  color_code: String,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  active: Boolean,
  accessible: Boolean,
  deleted: Boolean,
  email_signature: String,
  showSocialShare: Boolean,
  social_network: [BusinessSocial_networkInput],
  site_id: String,
  workspace_ids: [String],
  created_by: String,
  created_at: String,
  updated_at: String,
  deleted_at: String,
  business_info_ids: [String],
  web_url: String
}

extend type Query {
    getBusiness: [Business]
}

extend type Mutation {
    addBusiness(input: businessInput): Business
    updateBusiness(businessID: ID!, input: businessInput): Business
    deleteBusiness(businessID: ID!): Business
}
`