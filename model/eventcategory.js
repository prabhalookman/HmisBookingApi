import mongoose from 'mongoose'

const eventCategorySchema = new mongoose.Schema({
  category_name: String,
  parant_category_id: String,
  icon: String,
  icon_path: String,
  event_category_type: String,
  active: Boolean,
  deleted: Boolean,
  accessible: Boolean,
  site_id: String,
  created_by: String,
  created_at: String,
  updated_at: String,
  deleted_at: String,
  workspace_id: String,
  color_code: String
})

const EventCategory = mongoose.model('EventCategory', eventCategorySchema)
module.exports = EventCategory;