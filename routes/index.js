const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => res.render('welcome'))

module.exports = routes