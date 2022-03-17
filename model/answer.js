import double from '@mongoosejs/double';
import mongoose from 'mongoose'

const answerSchema = new mongoose.Schema({    
    answer: String,
    created_by: String,
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'customer'},
    form_id: { type: mongoose.Schema.Types.ObjectId, ref: 'form'},
    form_with_answer: String,
    staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'staff'},
    site_id: { type: mongoose.Schema.Types.ObjectId, ref: 'site'},
    workspace_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'workspace'}]
})

const Answer = mongoose.model('answer', answerSchema, 'answer')
export default Answer;