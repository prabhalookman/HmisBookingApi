import { gql } from 'apollo-server-express';

export default gql`
type Timings {
    _id: ID
    name: String,
    time_zone: String,
    timings_type: String,    
    work_day_id: Number,
    work_day_name: String,
    start_time: String,
    end_time: String,
    breaktime: [timings_BreakTime],
    work_day_duration: Number,
    service_ids: [Event],
    recurringRule: timings_recurringRule,    
    workspace_ids: [Workspace],
    site_id: Site,
    include_weekends: Boolean,
    timing_order: Number,
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