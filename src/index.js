const express = require('express')
const hdb = require('express-handlebars')
const path = require('path')
const morgan = require('morgan')
const app = express()
const port = 3000


app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded())
app.use(express.json())

//template engine
app.engine('hbs', hdb({extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

//HTTP Logger
app.use(morgan('combined'))


app.get('/', (req, res) => {
    res.render('home')
})


app.get('/search', (req, res)=>{
    console.log(req.query)
    res.render('search')
})


app.post('/search', (req, res)=>{
    console.log(req.body)
    res.send()
})

app.listen(port, ()=>{
    console.log(`listening at http://localhost:${port}`)
})
