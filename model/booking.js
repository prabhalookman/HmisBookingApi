import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  
  appointment_booking_time: Date,
  appointment_end_time: Date,
  appointment_start_time: Date,
  is_recurring: Boolean,
  timezone: String,
    
  booked_by: String,
  cost: mongoose.Types.Decimal128,
  
  customer_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'customer' }],
  customer_mood: String,
  customer_status: String,
  
  location_id: String,
  location_link: String,  
  integration: String,

  note: String,
  slot: Number,
  arrival_status: String,
  
  type: String,
  
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'events' },
  guest_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'customer' }],
  site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'site' },
  add_on_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AddOn' }],
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'staff' },
  workspace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'workspace' },

  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'staff' },
  created_at: Date,  
  created_from: String,
  deleted: Boolean,
  deleted_at: Date,
  updated_at: Date
}
)

const Booking = mongoose.model('booking', bookingSchema, 'booking')
module.exports = Booking;