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
    telephone: {
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
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User