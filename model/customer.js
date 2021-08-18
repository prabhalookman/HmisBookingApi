import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema({  
  //name,color,logo,timing,and location
  name: String,  
  timing_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Timings' }],
  location_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],
  workspace_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }],
  site_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Site' }],

})

const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer;