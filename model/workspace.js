import mongoose from 'mongoose'

const workspaceSchema = new mongoose.Schema({
    name: String,
    type: String,
    new_business: Boolean,
    color_code: String,
    display_name: String,
    display_order: Number,
    time_zone: String,
    default_language: String,
    calendar_view_settings : String,
    active: Boolean,
    deleted: Boolean,   
    accessible: Boolean,
    site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_at: String,
    updated_at: String,   
    deleted_at: String,
    is_owner: Boolean 
})

const Workspace = mongoose.model('Workspace', workspaceSchema)
module.exports = Workspace;