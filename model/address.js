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
  customer_id: String,   
  delete: Boolean, 
  site_id: String, 
  workspace_ids: [String],   
  default_address: Boolean, 
  business_head_ofice: Boolean  
})

const Address = mongoose.model('Address', addressSchema)
module.exports = Address;