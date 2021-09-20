import { gql } from 'apollo-server-express';

export default gql`
type Event {
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

  workspace_id: Workspace,
  site_id: Site,
  timing_ids: [Timing],
  location_setting_ids: [LocationSetting],
  staff: [Staff]
  add_on_ids: [AddOn]
}

extend type Query {
  getEvents(workspace_id: ID, site_id: ID, staff_ids: ID ): [Event]
  getAvailabilityByEvents(workspace_id: ID, site_id: ID, staff_ids: ID, event_id: [ID], date: String): Availablilities
  getEventsDetailByStaff(workspace_id: ID, site_id: ID, staff_ids: ID): [Event]
  getLocationByServiceId(workspace_id: ID, site_id: ID,event_id: ID):[Event]
}
`