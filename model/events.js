import mongoose from 'mongoose'
const eventSchema = new mongoose.Schema({  
  name: String,
  color_code: String,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  duration_hours: Number,
  duration_minutes: Number,

  workspace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'workspace' },
  site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'site' },
  timing_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'timings' }],
  location_setting_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'locationsetting' }],
  staff: [{ type: mongoose.Schema.Types.ObjectId, ref: 'staff'}]
 
})
const Event = mongoose.model('events', eventSchema, 'events')
module.exports = Event;