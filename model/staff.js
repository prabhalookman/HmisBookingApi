import mongoose from 'mongoose'

const staffSchema = new mongoose.Schema({
  //name,color,logo,timing,and location
  name: String,
  color_code: String,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  workspace_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }],
  site_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Site' }],
  staff_detail_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StaffDetails'}]
})

const Staff = mongoose.model('Staff', staffSchema)
module.exports = Staff;