import { gql } from 'apollo-server-express';

export default gql`
type Events {
  _id: ID
  name: String,
  description: String,
  price: String,  
  special_price: String,
  retailPrice: String,
  color_code: String,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  duration_hours: Int,
  duration_minutes: Int,
  business_id: [Business],
  business_timings: Boolean,
  isformrequired: Boolean,
  isform: Boolean,
  form_id: Form,
  is_recurring: Boolean

  workspace_id: Workspace,
  site_id: Site,
  timing_ids: [Timing],
  location_setting_ids: [LocationSetting],
  staff: [Staff],
  add_on_ids: [AddOn]
}

type StaffEvents {
  _id: ID,
  events: Events,
  timings_day: String
}

type EventWithAvailDate {
  location_names: [String],
  available_dates: [String]
  timings_day: [String],
  events: [Events]
}

extend type Query {
  getEvents(workspace_id: ID, site_id: ID, staff_ids: ID ): [Events]
  getEventsDetailByStaff(workspace_id: ID, site_id: ID, staff_id: ID): [Events]
  getEnabledDate(workspace_id: ID, site_id: ID, staff_id: ID, event_id: ID, timings_day: [String] ) : [String]
  getStaffToTransfer(workspace_id: ID, site_id: ID, staff_id: ID, event_id: ID, appointment_date: String, booking_id: ID): [Staff]
  getLocationByServiceId(workspace_id: ID, site_id: ID,event_id: ID):[Events]
}
`

/*
available_dates: [String],
 */