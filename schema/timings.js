import { gql } from 'apollo-server-express';

export default gql`
type Timing {
    _id: ID
    business_hour: Boolean
    business_location_setting_ids: [LocationSetting]    
    custom_hour: Boolean    
    include_weekends: Boolean
    location_setting_ids: [LocationSetting]
    time_zone: String
    timing_order: Int    
    timings: [TimingTiming]
    timing_type: String    
    site_id: Site
    workspace_ids: [Workspace]
}

type TimingTiming {
  breaktime: [TimingTimingBreaktime]
  end_time: String
  is_override_block: Boolean
  name: String
  recurringRule: TimingTimingRecurringRule
  service_ids: [ID]
  start_time: String
  work_day_duration: Int
  work_day_id: Int
  work_day_name: String
}

type TimingTimingBreaktime {
  end_time: String
  start_time: String
}

type TimingTimingRecurringRule {
  freq: String
  repeatEvery: Int
  until: Timing
}

extend type Query {
    getTimings: [Timing]
}

`