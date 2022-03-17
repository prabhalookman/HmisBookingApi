import double from '@mongoosejs/double';
import mongoose from 'mongoose'

const formSchema = new mongoose.Schema({
  active: Boolean,
  deleted: Boolean,
  expired_date: Date,
  form_data: String,
  form_type: String,
  name: String,
  slug: String,
  view_by: String,
  site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'site' },
  workspace_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'workspace' }]
})

const Form = mongoose.model('form', formSchema, 'form')
export default Form;
