import mongoose from 'mongoose'

const bookingmentSchema = new mongoose.Schema({
  
  booking_id: String,
  customer_id: String,
  customer_name: String,
  customer_contact: String,
  customer_email: String,
  isTermAgreed: Boolean,
  isPromoAccepted: Boolean, 

  time_zone: String,
  availability_Mode: {
  type: String,
  enum: ['INPERSON', 'ONCALL', 'VIDEO'],
  default: 'INPERSON',  
  },

  appointment_date:String,
  start_time:String,
  start_time_expected:String,
  end_time:String,
  end_time_expected:String,
  recurring: Boolean,
  price_expected:Number,
  price_full: Number,
  canceled: Boolean,
  cancellation_reason: String, 

  add_on_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AddOn' }],
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' },
  workspace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' },
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
  location_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },

  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: String,
  updated_at: String,
  deleted_at: String,
}
)

const Booking = mongoose.model('Booking', bookingSchema)
module.exports = Booking;