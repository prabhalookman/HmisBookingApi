import mongoose from 'mongoose'

const settingSchema = new mongoose.Schema({  
  advance_Booking_Period: {
    format: String,
    value: Number
  },
  client_time_slot: Number,
  site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'site' },
  workspace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'workspace' }
})

const Setting = mongoose.model('settings', settingSchema, 'settings')
export default Setting;