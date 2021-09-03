import mongoose from 'mongoose'
const locationsettingSchema = new mongoose.Schema({
  workspace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' },
  site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' },
  location_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
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

const LocationSetting = mongoose.model('locationsetting', locationsettingSchema, 'locationsetting')
module.exports = LocationSetting;