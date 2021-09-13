import mongoose from 'mongoose'

const siteSchema = new mongoose.Schema({
    name: String,
    workspace_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'workspace' }],  
})

const Site = mongoose.model('site', siteSchema, 'site')
module.exports = Site;