const express = require('express')
const bcrypt = require('bcrypt')
const routes = express.Router()

// User model
const User = require('../models/User')

routes.get('/login', (req, res) => res.render('login'))
routes.get('/register', (req, res) => res.render('register'))

// Handle register
routes.post('/register', (req, res) => {
    const {
        username,
        name,
        email,
        date_of_birth,
        address,
        gender,
        phone,
        password,
        cpassword
    } = req.body
    let errors = []
    if (!username || !name || !email || !date_of_birth || !address || !gender || !phone || !password || !cpassword) {
        errors.push({
            msg: 'Please fill all fields'
        })
    }
    if (password !== cpassword) {
        errors.push({
            msg: 'Passwords are not match'
        })
    }

    if (password.length < 6) {
        errors.push({
            msg: 'The password should be at least 6 characters'
        })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            username,
            name,
            email,
            address,
            gender,
            phone,
            date_of_birth,
            password,
            cpassword
        })
    } else {
        User.findOne({
                email: email
            })
            .then(user => {
                if (user) {
                    errors.push({
                        msg: 'This E-mail is already registered'
                    })
                    res.render('register', {
                        errors,
                        username,
                        name,
                        email,
                        address,
                        gender,
                        phone,
                        date_of_birth,
                        password,
                        cpassword
                    })
                } else {
                    const newUser = new User({
                        username,
                        name,
                        email,
                        address,
                        gender,
                        phone,
                        date_of_birth,
                        password
                    })
                    // Hash Password
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        // Set The password
                        newUser.password = hash
                        // Register the user
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered and can log in')
                                res.redirect('/users/login')
                            })
                            .catch(err => console.log(err))
                    }))
                }
            })
    }

})

module.exports = routes