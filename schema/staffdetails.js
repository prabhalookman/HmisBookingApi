import { gql } from 'apollo-server-express';

export default gql`
type StaffDetails {
  _id: ID,  
  description: String,
  price: String,
  business_timings: Boolean,
  business_id: [Business],  
  workspace_id: [Workspace],
  site_id: String,
  address_ids: [Address],
  timing_ids: [Timing],
  sorting_id: Int,
  event_ids: [Event],
  location_setting_ids: [LocationSetting]
}

type Availablilities {
  start_date: String,
  end_date: String,
  pre_booking_day: Int,
  available_date: [String],
  disable_date: [String],
	availableTimes: [availTimes],
  locationAvailable: [availLocations]
  selectedDate: String
}

type availTimes {
  _id: String,
  time: String,
  isBooking: Boolean
}

type availLocations {
  _id: String, 
  type: String
}


extend type Query {
  getStaffDetails(workspace_id: ID, site_id: ID): [StaffDetails]
  getstaffdetailbyservice(workspace_id: ID, site_id: ID,event_ids: ID):[StaffDetails]
  getAvailabilityByStaff(workspace_id: ID, site_id: ID, staff_ids: ID, event: [ID], date: String): Availablilities
}

`