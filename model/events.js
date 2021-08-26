import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({  
  name: String,
  color_code: String,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  duration_hours: Number,
  duration_minutes: Number,

  workspace_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }],
  site_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Site' }],
  timing_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Timings' }],
  location_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],  
  staff_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Staff'}]

  
})

const Event = mongoose.model('Event', eventSchema)
module.exports = Event;