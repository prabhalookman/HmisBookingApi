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
  event_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],
  workspace_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'workspace' }],
  site_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'site' }],
  delete: {
    type: Boolean,
    default: false
  }
})

const AddOn = mongoose.model('addons', addonSchema, 'addons')
module.exports = AddOn;