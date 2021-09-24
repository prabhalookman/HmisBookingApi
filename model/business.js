import mongoose from 'mongoose'

const businessSchema = new mongoose.Schema({
    business_info_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'businessinfo' }],    
    display_name: String,    
    name: String,    
    site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'site' },
    workspace_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'workspace' }]
})

const Business = mongoose.model('business', businessSchema, 'business')
module.exports = Business;

/*
social_network: [BusinessSocial_network],
email_signature: String,
showSocialShare: Boolean,

staff_size: Int,
type: String,
updated_at: DateTime,
web_url: String,

accessible: Boolean,
active: Boolean,
avatar_or_icon: String,
avatar_or_icon_path: String,
business_branch: String,

color_code: String,
created_at: DateTime,
created_by: Staff,
delete: Boolean,
deleted_at: DateTime,
description: String,
*/