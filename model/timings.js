import mongoose from 'mongoose'

const timingtimingSchema = new mongoose.Schema({
    business_hour: Boolean,
    business_location_setting_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'locationsetting' }],    
    custom_hour: Boolean,    
    include_weekends: Boolean,
    location_setting_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'locationsetting' }],
    time_zone: String,
    timing_order: Number,
    timings: [{
      breaktime: [{
        end_time: String,
        start_time: String
      }],
      name: String,
      start_time: String,
      end_time: String,
      work_day_duration: Number,
      work_day_id: Number,
      work_day_name: String,
      is_override_block: Boolean,      
      recurringRule: {
        freq: String,
        repeatEvery: Number,
        until: Date,
      },
      service_ids: [mongoose.Schema.Types.ObjectId]      
    }],
    timing_type: String,    
    workspace_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'workspace' }],
    site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'site' }
})

const Timing = mongoose.model('timings', timingtimingSchema, 'timings')
module.exports = Timing;