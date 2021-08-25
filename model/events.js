import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  //name,color,logo,price,duration,timing,location - price, logo
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
  staffDetails_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StaffDetails'}]

  
})

const Events = mongoose.model('Events', eventSchema)
module.exports = Events;

/*
timing_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Timings' }],
location_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],
workspace_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }],
site_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Site' }],
staff_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }]
*/