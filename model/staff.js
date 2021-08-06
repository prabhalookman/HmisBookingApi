import mongoose from 'mongoose'

const staffSchema = new mongoose.Schema({
  name: String,
  color_code: Number,
  title: String,
  logo_path: String,  
  workspace_ids: [String],
  site_id: String,
  timing_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Timings' }],
  location_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }]
})

const Staff = mongoose.model('Staff', staffSchema)
module.exports = Staff;