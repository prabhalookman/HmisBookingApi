import { gql } from 'apollo-server-express';

export default gql`
type StaffDetails {
  _id: ID,  
  business_timings: Boolean,
  business_ids: [ID],  
  workspace_id: [ID],  
  site_id: String,
  address_ids: [ID],
  timing_ids: [ID],   
  sorting_id: Int,
  event_ids: [ID]
}

extend type Query {
  getStaffDetails: [StaffDetails]
}

`