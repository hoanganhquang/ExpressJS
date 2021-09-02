const path = require('path')
const express = require('express')
const morgan = require('morgan')
const exphbs  = require('express-handlebars')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan('combined')) // HTTP logger

// template engine
app.engine('hbs', exphbs({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/news', (req, res) => {
    res.render('news')
})

app.listen(port, ()=> console.log(`Example app listening at http://localhost:${port}`))
