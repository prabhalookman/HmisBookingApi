import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
    name: String,
    default_language: String,
    account_status: String,
    accessible: Boolean,
    active: Boolean,
    suspended: Boolean,
    deleted: Boolean,
    payment_status_id: String,
    payment_status: String,
    subcription_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_at: String,
    updated_at: String,
    deleted_at: String,
    googleAnalyticsCode: String 
})

const Service = mongoose.model('Service', serviceSchema)
module.exports = Service;