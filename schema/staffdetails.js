import { gql } from 'apollo-server-express';

export default gql`
scalar Date
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
  locationAvailable: String
  selectedDate: String
  displaySettings:String
}

type availTimes {
  _id: String,
  slotStartTime: Date,
  slotEndTime: Date
  slot: Int
  isBooking: Boolean
  
}

type AvailLocations {
  start_date: String,
  end_date: String,
  pre_booking_day: Int,
  available_date: [String],
  disable_date: [String],
	locationAvailable: [Avail_Location_Settings]
  selectedDate: String
  displaySettings:String,
  clientSlot: Int
}

type Avail_Location_Settings {
  location_setting_id: String, 
  location_name: String, 
  location_type: String
  }
input getAvailInput {
  workspace_id: ID, 
  site_id: ID, 
  staff_ids: ID, 
  event: [ID], 
  date: String, 
  location: String,
  locationSettingId: ID
  }


extend type Query {
  getStaffDetails(workspace_id: ID, site_id: ID): [StaffDetails]
  getstaffdetailbyservice(workspace_id: ID, site_id: ID,event_ids: ID):[StaffDetails]
  getAvailabilityByStaff(workspace_id: ID, 
  site_id: ID, 
  staff_ids: ID, 
  event: [ID], 
  date: String, 
  location: String,
  locationSettingId: ID): Availablilities
  getLocationSettings(workspace_id: ID, site_id: ID, staff_id: ID, date: String): AvailLocations
}

`