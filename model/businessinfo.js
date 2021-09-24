import mongoose from 'mongoose'

const businessInfoSchema = new mongoose.Schema({
  business_hour_end: Number,
  business_hour_start: Number,
  restrictedDays: [Date],
  time_zone: String,
  timing_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'timings' }],  
  site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'site' },
  workspace_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'workspace' }]

})

const BusinessInfo = mongoose.model('businessinfo', businessInfoSchema, 'businessinfo')
module.exports = BusinessInfo;

/*
 accessible: Boolean,
  active: Boolean,
  
  bookingLinks: String,
  created_at: Date,
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'staff' },
  date_format: String,
  delete: Boolean,
  deleted_at: Date,
  first_day: Number,
  is_tax: Boolean,
  updated_at: Date,
  
  tax_no: String,
  tax_percentage: Number,

business_sub_category: [Businesscategory],
business_category: [Businesscategory],
address_ids: [Address],
policy: BusinessinfoPolicy,
time_format_id: Timeformat,
*/