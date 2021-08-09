import { gql } from 'apollo-server-express';

export default gql`
type StaffDetails {
  _id: ID,
  
  business_timings: Boolean,
  business_ids: [String],  
  workspace_id: [String],  
  site_id: String,
  address_ids: [String],
  timing_ids: [String],   
  sorting_id: Int,
  event_ids: [String]
}

extend type Query {
  getStaffDetails: [StaffDetails]
}

`