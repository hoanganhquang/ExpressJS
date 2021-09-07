const express = require('express')
const hdb = require('express-handlebars')
const path = require('path')
const morgan = require('morgan')
const app = express()
const port = 3000
const db = require('./config/db/index')

db.connect()

// Routes
const routes = require('./routes/index')

// static path
app.use(express.static(path.join(__dirname, 'public')))

// dispatcher
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

//template engine
app.engine('hbs', hdb({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
}}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

//HTTP Logger
app.use(morgan('combined'))

// route init
routes(app)


app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})
