import mongoose from 'mongoose'
const locationsettingSchema = new mongoose.Schema({
  workspace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'workspace' },
  site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'site' },
  location_id: { type: mongoose.Schema.Types.ObjectId, ref: 'location' },
  inperson: { 
    buinsess_address: Boolean,
    buinsess_id: { type: mongoose.Schema.Types.ObjectId, ref: 'business' },
    client_address: Boolean
  },
  oncall: {
    client_will_call : Boolean,
    staff_will_call : Boolean
  },
  video: { 
    integration_id: { type: mongoose.Schema.Types.ObjectId, ref: 'integration' },
    type: String
  }
})

const LocationSetting = mongoose.model('locationsetting', locationsettingSchema, 'locationsetting')
module.exports = LocationSetting;