import { gql } from 'apollo-server-express';

export default gql`
scalar Date
type BusinessInfo {
  _id: ID
  business_hour_end: Int,
  business_hour_start: Int,
  restrictedDays: [Date],
  time_zone: String,
  timing_ids: [Timing],  
  site_id: Site,
  workspace_id: [Workspace]
}

`

/*

extend type Query {
    getBusiness: [Business]
}

*/