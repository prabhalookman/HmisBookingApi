import mongoose from 'mongoose'

const addonSchema = new mongoose.Schema({
  name: String,
  price: Number,
  variant: [{
    name: String,
    price: Number
  }],
  show_multiple_time: Boolean,
  once_per_order: Boolean,
  event_ids: [String],
  workspace_ids: [String],
  active: Boolean,  
  site_id: String
})

const AddOn = mongoose.model('AddOn', addonSchema)
module.exports = AddOn;