const express = require('express')
const path = require('path')
const morgan = require('morgan')
const app = express()
const port = 3000

// HTTP Logger
app.use(morgan('combined'))

//Load view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () =>{
    console.log(`Listening at http://localhost:${port}`)
})