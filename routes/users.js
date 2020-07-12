const express = require('express')
const routes = express.Router()

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
    if (!username || !name || !email || !date_of_birth || !address || !gender || !phone) {
        errors.push({
            msg: 'Please fill all fields'
        })
    }


})

module.exports = routes