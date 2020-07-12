const express = require('express')
const routes = express.Router()

routes.get('/login', (req, res) => res.render('login'))
routes.get('/register', (req, res) => res.render('register'))

module.exports = routes