import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
  type: String,
  type_param: Boolean,
  app_integration_need: Boolean,
  icon: String,
  icon_path: String,
  active: Boolean,
  deleted: Boolean,
  created_at: String,
  updated_at: String,
  deleted_at: String,
  name: String 
})

const Location = mongoose.model('Location', locationSchema)
module.exports = Location;