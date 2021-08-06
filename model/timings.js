import mongoose from 'mongoose'

const timingsSchema = new mongoose.Schema({
    name: String,
    time_zone: String,
    timings_type: String,    
    work_day_id: Number,
    work_day_name: String,
    start_time: String,
    end_time: String,
    breaktime: [
        {
            start_time: String,
            end_time: String
        }
    ],
    work_day_duration: Number,
    service_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    recurringRule: {
        freq: String,
        repeatEvery: Number,
        until: String
    },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },    
    workspace_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }],
    site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' },
    include_weekends: Boolean,
    timing_order: Number,
    location_setting_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LocationSetting' }]
})

const Timings = mongoose.model('Timings', timingsSchema)
module.exports = Timings;