const express = require('express')
const exphbs = require("express-handlebars");
const path = require('path')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(express.static('public'))

// HTTP Logger
app.use(morgan('combined'))

//Load view engine
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home')
})


app.listen(port, () =>{
    console.log(`Listening at http://localhost:${port}`)
})