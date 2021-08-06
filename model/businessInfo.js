import mongoose from 'mongoose'

const businessInfoSchema = new mongoose.Schema({  
  booking_links: String,  
  policy: {
    appointment: String,
    cancellation: String,
    terms_and_condition: String
  },
  site_id: String,
  workspace_ids: [String],  
})

const BusinessInfo = mongoose.model('BusinessInfo', businessInfoSchema)
module.exports = BusinessInfo;