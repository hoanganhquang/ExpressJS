const express = require("express")
const app = express()
const port = 3000

app.get('/', (req, res)=>{
  res.status(200).json({hi: 'hello'})
})

app.listen(port, ()=>{
  console.log(`http://localhost:${port}`)
})
