import mongoose from 'mongoose'

const staffDetailsSchema = new mongoose.Schema({
  business_timings: Boolean,
  sorting_id: Number,
  description: String,
  price: String,
  business_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'business' }],
  workspace_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'workspace' }],
  site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'site' },
  address_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'address'}],
  timing_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'timings' }],  
  event_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],
  location_setting_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'locationsetting' }],
})

const StaffDetails = mongoose.model('staffdetails', staffDetailsSchema, 'staffdetails')
module.exports = StaffDetails;