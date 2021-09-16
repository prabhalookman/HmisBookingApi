import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema({
  
  address_id: { type: mongoose.Schema.Types.ObjectId, ref: 'address'},
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  booking_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'booking'}],
  color_code: String,
  date_of_birth: String,
  description: String,
  phone: [{ 
    country_code: String,
    is_verified: Boolean,
    name: String,
    no: String,
    type: String }],

  display_name: String,
  email: String,
  email_verified_date_time: String,
  first_name: String,
  gender: String,
  
  is_email_verified: Boolean,
  last_name: String,
  name: String,
  

  registeredUsing: String,
  registration_date: String,
  slug: String,
  source: String,
  timezone: String
})

const Customer = mongoose.model('customer', customerSchema, 'customer')
module.exports = Customer;

/*

discount_coupon_ids: [Discountcoupon],
gift_card_ids: [Giftcard],
order_ids: [Order],
,
profile: CustomerProfile,

*/