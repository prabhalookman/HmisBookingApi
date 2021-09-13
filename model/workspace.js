import mongoose from 'mongoose'

const workspaceSchema = new mongoose.Schema({
    name: String,    
    site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'site' }
})

const Workspace = mongoose.model('workspace', workspaceSchema,'workspace')
module.exports = Workspace;