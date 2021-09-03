import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema({
  //name,color,logo,timing,and location
  name: String,
  email: String,
  email_verified_date_time: Date,
  phone: [{
    country_code: String,
    is_verified: Boolean,
    name: String,
    no: String,
    type: String
  }],
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  display_name: String,
  address_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' }
})

const Customer = mongoose.model('customer', customerSchema, 'customer')
module.exports = Customer;