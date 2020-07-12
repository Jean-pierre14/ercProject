const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: date,
        default: Date.now()
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User