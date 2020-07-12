const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')

const app = express()

const db = require('./config/key').MongoURI
mongoose.connect(db, {
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err))

const PORT = 7000

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

// BodyParse
app.use(express.urlencoded({
    extended: false
}))

// Express-session config
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: ''
}))

// connect-flash middleware config
app.use(flash())

// Global Variable
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

// Static file
app.use('/assets', express.static('public'))
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))


app.listen(PORT, (err) => {
    if (err) throw err
    console.log(`Server stard on port: ${PORT}`)
})