import mongoose from 'mongoose'
const locationsettingSchema = new mongoose.Schema({
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: String,
  updated_at: String,
  deleted_at: String,
  workspace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' },
  site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' },
  location_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  active: Boolean,
  deleted: Boolean,
  inperson: { 
    buinsess_address: Boolean,
    buinsess_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
    client_address: Boolean
  },
  oncall: {
    client_will_call : Boolean,
    staff_will_call : Boolean
  },
  video: { 
    integration_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Integration' },
    type: String
  }
})

const LocationSetting = mongoose.model('LocationSetting', locationsettingSchema)
module.exports = LocationSetting;