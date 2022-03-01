import double from '@mongoosejs/double';
import mongoose from 'mongoose'

const appintegrationSchema = new mongoose.Schema({    
    app_id: { type: mongoose.Schema.Types.ObjectId, ref: 'app' },
    chat_id_or_no: String,
    deleted: Boolean,
    is_installed: Boolean,
    key: String,
    location_setting_id: { type: mongoose.Schema.Types.ObjectId, ref: 'locationsetting' },
    secret: String,
    site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'site' },
    workspace_id: { type: mongoose.Schema.Types.ObjectId, ref: 'workspace' }
})

const Appintegration = mongoose.model('appintegration', appintegrationSchema, 'appintegration')
export default Appintegration;
