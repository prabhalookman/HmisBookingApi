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
  event_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  workspace_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }],
  site_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Site' }],
})

const AddOn = mongoose.model('AddOn', addonSchema)
module.exports = AddOn;