const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => res.render('welcome'))

routes.post('/request', (req, res) => {
    const {
        email,
        message
    } = req.body
    let errors = []
    if (!email || !message) {
        errors.push({
            msg: 'Please fill in all field'
        })
    }
    if (errors.length > 0) {
        res.render('welcome', {
            errors,
            email,
            message
        })
    } else {
        res.send('Pass')
    }
})

module.exports = routes