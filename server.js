const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')

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

// Static file
app.use('/assets', express.static('public'))
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))


app.listen(PORT, (err) => {
    if (err) throw err
    console.log(`Server stard on port: ${PORT}`)
})