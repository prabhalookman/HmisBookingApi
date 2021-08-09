import mongoose from 'mongoose'

const workspaceSchema = new mongoose.Schema({
    name: String,    
    site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' }
})

const Workspace = mongoose.model('Workspace', workspaceSchema)
module.exports = Workspace;