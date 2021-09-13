import mongoose from 'mongoose'

const staffSchema = new mongoose.Schema({
  //name,color,logo,timing,and location
  name: String,
  color_code: String,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  workspace_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'workspace' }],
  site_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'site' }],
  staff_detail_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'staffdetails'}]
})

const Staff = mongoose.model('staff', staffSchema, 'staff')
module.exports = Staff;