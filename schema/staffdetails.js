import { gql } from 'apollo-server-express';

export default gql`
type StaffDetails {
  _id: ID,  
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
type GetDate {
  start_time: String,
	 end_time: String,
	 acvailable: Boolean,
   locations: [LocationSetting]
   timings: Timing
}

type LocationAvailable {
  _id: ID  
}

extend type Query {
  getStaffDetails(workspace_id: ID, site_id: ID): [StaffDetails]
  getstaffdetailbyservice(workspace_id: ID, site_id: ID,event_ids: ID):[StaffDetails]
  getAvailabilityByStaff(workspace_id: ID, site_id: ID, staff_ids: ID): [GetDate]
}

`