const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const NewReq = mongoose.model('request', RequestSchema)
module.exports = NewReq