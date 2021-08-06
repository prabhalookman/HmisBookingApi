import { gql } from 'apollo-server-express';

export default gql`
type TimeFormat {
  _id: ID
  time_zone: String,
  timeFormat: Int,
  date_format: String,
  first_day: Int,
  business_hour_start: Int,
  business_hour_end: Int,
  workspace_id: Workspace,
  site_id: Site
}

input timeformatInput {
  time_zone: String,
  timeFormat: Int,
  date_format: String,
  first_day: Int,
  business_hour_start: Int,
  business_hour_end: Int,
  workspace_id: ID,
  site_id: ID 
}

extend type Query {
  getTimeFormats: [TimeFormat]
}

extend type Mutation {
    addTimeFormat(input: timeformatInput): TimeFormat
    updateTimeFormat(timeformatID: ID!, input: timeformatInput): TimeFormat
    deleteTimeFormat(timeformatID: ID!): TimeFormat
}
`