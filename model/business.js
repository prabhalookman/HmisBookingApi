import mongoose from 'mongoose'

const businessSchema = new mongoose.Schema({  
  //Name and address and logo 
  name: String,  
  site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'site' },
  workspace_ids: { type: mongoose.Schema.Types.ObjectId, ref: 'workspace' },  
  address_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'address'}],
})

const Business = mongoose.model('business', businessSchema, 'business')
module.exports = Business;