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
    recurringRule: {
        freq: String,
        repeatEvery: Number,
        until: String
    },    
    include_weekends: Boolean,
    timing_order: Number,
    site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'site' },
    workspace_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'workspace' }],
    service_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],    
    location_setting_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'locationsetting' }]
})

const Timings = mongoose.model('timings', timingsSchema, 'timings')
module.exports = Timings;