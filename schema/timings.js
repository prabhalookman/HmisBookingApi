import { gql } from 'apollo-server-express';

export default gql`
type Timings {
    _id: ID
    name: String,
    time_zone: String,
    timings_type: String,    
    work_day_id: Int,
    work_day_name: String,
    start_time: String,
    end_time: String,
    breaktime: [timings_BreakTime],
    work_day_duration: Int,    
    recurringRule: timings_recurringRule,    
    include_weekends: Boolean,
    timing_order: Int,    
    site_id: Site,
    workspace_ids: [Workspace],
    service_ids: [Event],
    location_setting_ids: [LocationSetting]
}

type timings_BreakTime {
    start_time: String,
    end_time: String
}

type timings_recurringRule {
    freq: String,
    repeatEvery: Int,
    until: String
}

extend type Query {
    getTimings: [Timings]
}

`