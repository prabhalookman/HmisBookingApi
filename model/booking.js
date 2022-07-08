import mongoose from 'mongoose'
import Double from '@mongoosejs/double';

var progressSchema = new mongoose.Schema({
  date_time: {type: Date, default: Date.now},
  status: {type: String, default: "Booked"}
});
const bookingSchema = new mongoose.Schema({  
  add_on_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'addons'}],
  amount_paid: Number,
  appointment_booking_time: {type: Date, default: Date.now},
  appointment_end_time: Date,
  appointment_start_time: Date,
  appointment_time_before_reschedule: [Date],

  cost: Double,
  created_at: {type: Date, default: Date.now},
  answer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'answer'},
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'staff'},
  created_from: String,
  customer_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'customer'}],
  guest_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'guest'}],
  
  customer_mood: String,
  customer_status: String,
  Is_cancelled: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  deleted_at: Date,
  booked_by: String,
  progress: [{
    date_time: {type: Date, default: Date.now},
    status: {type: String, default: "Booked"}
  }],

  buffer_after_min : Number,
  buffer_before_min : Number,
  duration_hours : Number,
  duration_minutes : Number,
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: 'events'},

  is_recurring: Boolean,
  is_rescheduled: Boolean,
  is_review_given: Boolean,
  location_link: String,
  location_setting_id: { type: mongoose.Schema.Types.ObjectId, ref: 'locationsetting'},
  note: String,
  repeat_on: String,
  repeat_upto_date: Date,

  site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'site'},
  slot: Number,
  staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'staff'},
  timezone: String,
  transfered_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'staff'}],
  type: String,
  updated_at: {type: Date, default: Date.now},  
  workspace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'workspace'}
})

const Booking = mongoose.model('booking', bookingSchema, 'booking')
export default Booking;



// arrival_status: String,
// assignee_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'staff'}],
// booked_by: String,
// booking_id: Number,

// discount_amount: Number,
// discount_applied: Boolean,
// discount_available: Boolean,
// discount_code: String,
// discount_id: { type: mongoose.Schema.Types.ObjectId, ref: 'discountcoupon'},

// extra_time_is_blocking: Boolean,
// gift_card_amount: Number,
// gift_card_applied: Boolean,
// gift_card_available: Boolean,
// gift_card_id: { type: mongoose.Schema.Types.ObjectId, ref: 'giftcard'},
// guest_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'customer'}],
// integration: String,
// is_approved: Boolean,
// is_asked_for_review: Boolean,
// Is_cancelled: Boolean,
// is_failed: Boolean,
// is_multi_service: Boolean,
// is_offer_applied: Boolean,
// is_offer_available: Boolean,
// is_paid: Boolean,

// offer_amount: Number,
// order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'order'},
// payment_mode_id: Number,
// platform: String,
// price_type: String,
// progress: [{ type: mongoose.Schema.Types.ObjectId, ref: 'bookingprogress'}],
// reference: String,
// resource_id: Number,
// room_id: String,

//  */