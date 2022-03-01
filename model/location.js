import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({  
  active: Boolean,
  app_id: { type: mongoose.Schema.Types.ObjectId, ref: 'app' },
  app_integration_need: Boolean,
  avatar_or_icon_path: String,  
  deleted: Boolean,  
  icon: String,
  name: String,
  type: String,
  type_param: Boolean
})

const Location = mongoose.model('location', locationSchema, 'location')
export default Location;