const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const { success, error } = require('consola')

const app = express()

//Passport config
require('./config/passport')(passport)

const db = require('./config/key').MongoURI
mongoose.connect(db, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true
    })
    .then(() => success({ message: `Mongodb connected ${db}`, badge: true }))
    .catch((err) => error({ message: `${err}`, badge: true }))
const PORT = 7001


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

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// connect-flash middleware config
app.use(flash())

// Global Variable
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

// Static file
app.use('/assets', express.static('public'))

// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

app.use('/get', require('./models/Request'))

app.listen(PORT, (err) => {
    if (err) throw err
    success({ message: `Server stard on port: ${PORT}`, badge: true })
})