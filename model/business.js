import mongoose from 'mongoose'

const businessSchema = new mongoose.Schema({
  display_name: String,
  description: String,
  name: String,
  color_code: String,
  logo_path: String,
  active: Boolean,
  deleted: Boolean,
  site_id: String,
  workspace_ids: [String],
  business_info_ids: [String],
  address_ids: [String],
})

const Business = mongoose.model('Business', businessSchema)
module.exports = Business;