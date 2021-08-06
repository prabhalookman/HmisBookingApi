import mongoose from 'mongoose'
const timeformatSchema = new mongoose.Schema({
    time_zone: String,
    timeFormat: Number,
    date_format: String,
    first_day: Number,
    workspace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' },
    site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' }
})

const Timeformat = mongoose.model('Timeformat', timeformatSchema)
module.exports = Timeformat;