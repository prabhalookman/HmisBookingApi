import mongoose from 'mongoose'

const businessSchema = new mongoose.Schema({  
  //Name and address and logo 
  name: String,  
  site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' },
  workspace_ids: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' },  
  address_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
})

const Business = mongoose.model('Business', businessSchema)
module.exports = Business;