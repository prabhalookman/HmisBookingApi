import mongoose from 'mongoose'
const eventSchema = new mongoose.Schema({  
  name: String,
  color_code: String,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  duration_hours: Number,
  duration_minutes: Number,
  description: String,
  price: String,
  special_price: String,
  retailPrice: String,
  add_on_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'addons' }],
  business_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'business' }],
  business_timings: Boolean,
  workspace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'workspace' },
  site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'site' },
  timing_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'timings' }],
  location_setting_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'locationsetting' }],
  staff: [{ type: mongoose.Schema.Types.ObjectId, ref: 'staff'}]
 
})
const Event = mongoose.model('events', eventSchema, 'events')
export default Event;