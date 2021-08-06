import { gql } from 'apollo-server-express';

export default gql`
type Timings {
    _id: ID
    time_zone: String,
    timings_type: String,
    business_hour: Boolean,
    custom_hour: Boolean,
    name: String,
    work_day_id: Int,
    work_day_name: String,
    start_time: String,
    end_time: String,
    breaktime: [timings_BreakTime],
    work_day_duration: Int,
    service_ids: [Events],
    is_override_block: Boolean,
    recurringRule: timings_recurringRule,
    created_by: User,
    created_at: String,
    updated_at: String,
    deleted_at: String,
    workspace_ids: [Workspace],
    site_id: Site,
    include_weekends: Boolean,
    timing_order: Int,
    location_setting_ids: [Locationsetting]
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

input timingsInput {
    _id: ID
    time_zone: String,
    timings_type: String,
    business_hour: Boolean,
    custom_hour: Boolean,
    name: String,
    work_day_id: Int,
    work_day_name: String,
    start_time: String,
    end_time: String,
    breaktime: [timings_BreakTime_input],
    work_day_duration: Int,
    service_ids: [ID],
    is_override_block: Boolean,
    recurringRule: timings_recurringRule_input,
    created_by: ID,
    created_at: String,
    updated_at: String,
    deleted_at: String,
    workspace_ids: [ID],
    site_id: ID,
    include_weekends: Boolean,
    timing_order: Int,
    location_setting_ids: [ID]
}

input timings_BreakTime_input {
    start_time: String,
    end_time: String
}

input timings_recurringRule_input {
    freq: String,
    repeatEvery: Int,
    until: String
}
extend type Query {
    getTimings: [Timings]
}

extend type Mutation {
    addTimings(input: timingsInput): Timings
    updateTimings(timingsID: ID!, input: timingsInput): Timings
    deleteTimings(timingsID: ID!): Timings
}
`