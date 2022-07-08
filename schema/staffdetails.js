import { gql } from 'apollo-server-express';

export default gql`
scalar Date
type StaffDetails {
  _id: ID,  
  description: String,
  price: String,
  business_timings: Boolean,
  active: Boolean,
  is_service_provider: Boolean, 
  business_id: [Business],  
  workspace_id: [Workspace],
  site_id: String,
  address_ids: [Address],
  timing_ids: [Timing],
  sorting_id: Int,
  events_ids: [Events],
  location_setting_ids: [LocationSetting],
  appointment_booking_ids:[Booking]
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
	locationAvailable: [location_locationsetting]
  selectedDate: String
  displaySettings:String,
  clientSlot: Int
}

type location_locationsetting {
  location: Location,
  locationsetting: LocationSetting
}

type Avail_Location_Settings {
  locationsetting_id: String,
  appintegration_id: String,
  is_installed: Boolean,
  app_name: String,
  location_id: String,
  location_type: String,
  location_name: String,
  location_app_integration_need: Boolean
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
  getStaffDetails(workspace_id: ID!, site_id: ID!): [StaffDetails]

  getstaffdetailbyservice(workspace_id: ID!, site_id: ID!,event_id: ID!):[Staff]

  getAvailabilityByStaff(
  workspace_id: ID!, 
  site_id: ID!, 
  staff_ids: ID!, 
  event: [ID!], 
  date: String!, 
  locationName: [String!],
  locationSettingId: [ID]): Availablilities
  
  getEventLocationSettings(workspace_id: ID!, site_id: ID!, event_id: ID!, date: String!): AvailLocations
  
  
}

`