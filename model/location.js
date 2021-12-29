import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({  
  icon: String,
  icon_path: String,
  active: Boolean,
  deleted: Boolean,  
  name: String 
})

const Location = mongoose.model('location', locationSchema, 'location')
export default Location;