import mongoose from 'mongoose'

const staffDetailsSchema = new mongoose.Schema({
  business_timings: Boolean,
  business_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Business' }],
  workspace_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }],
  site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' },
  address_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
  timing_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Timings' }],
  sorting_id: Number,
  event_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Events' }]
})

const StaffDetails = mongoose.model('StaffDetails', staffDetailsSchema)
module.exports = StaffDetails;