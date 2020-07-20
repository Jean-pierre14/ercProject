const express = require('express')
const routes = express.Router()
const { ensureAuthenticated } = require('../config/auth')
const User = require('../models/User')
const mongoose = require('mongoose')

const NewReq = require('../models/Request')

routes.get('/', (req, res) => res.render('welcome'))
routes.get('/dashboard', (req, res) => res.render('dashboard', { name: req.body.name }))
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