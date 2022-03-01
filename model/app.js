import double from '@mongoosejs/double';
import mongoose from 'mongoose'

const appSchema = new mongoose.Schema({    
  active: Boolean,
  avatar_or_icon: String,
  avatar_or_icon_path: String,
  category: String,
  color_code: String,
  deleted: Boolean,
  name: String,
  visible_page: String
})

const App = mongoose.model('app', appSchema, 'app')
export default App;
