import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
  address1: String, 
  address2: String, 
  city: String, 
  state: String, 
  country: String, 
  zipCode: String,   
  business_branch: Boolean, 
  address_phone: [
    {
    name: String,
    phone_type: String,
    country_code: String,
    no: String, 
    Ext: String
    }
  ], 
  email: String, 
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'customer' },     
  workspace_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'workspace' }],
  site_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'site' }]  
})

const Address = mongoose.model('address', addressSchema, 'address')
module.exports = Address;