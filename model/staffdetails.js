import mongoose from 'mongoose'

const staffDetailsSchema = new mongoose.Schema({
  booking_url: String,
  business_timings: Boolean,
  business_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Business' }],  
  workspace_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }],  
  site_id: String,
  address_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
  timing_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Timings' }],
  active: Boolean,
  delete: Boolean,
  invitation_status_accept: Boolean,
  event_ids: [String]
})

const StaffDetails = mongoose.model('StaffDetails', staffDetailsSchema)
module.exports = StaffDetails;