const express = require('express')
const routes = express.Router()
const { ensureAuthenticated } = require('../config/auth')
const mongoose = require('mongoose')
const User = require('../models/User')

const NewReq = require('../models/Request')

routes.get('/', (req, res) => {
    User.find({}, (err, cb) => {
        if (err) throw err
        res.render('welcome', { cb })
    })
})
routes.get('/dashboard', (req, res) => res.render('dashboard', { name: req.user.name }))
    // Handle post request
routes.post('/request', (req, res) => {
    const {
        email,
        message
    } = req.body
    let errors = []
    if (!email || !message) {
        errors.push({
            msg: 'Please fill in all fields'
        })
    }

    if (errors.length > 0) {
        res.render('welcome', {
            errors,
            email,
            message
        })
    } else {
        const Newrequest = new NewReq({
            email,
            message
        })
        Newrequest.save((err, doc) => {
            if (err) throw err
            req.flash('success_msg', 'Your request was sended!')
            res.redirect('/')
        })
    }
})

module.exports = routes