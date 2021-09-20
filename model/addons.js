import mongoose from 'mongoose'

const addonSchema = new mongoose.Schema({
  active: Boolean,
  delete: Boolean,
  event_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],
  name: String,
  once_per_order: Boolean,
  price: String,
  show_multiple_time: Boolean,
  site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'site' },
  variant: [{
    name: String,
    price: String
}],
  workspace_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'workspace' }]
})

const AddOn = mongoose.model('addons', addonSchema, 'addons')
module.exports = AddOn;
