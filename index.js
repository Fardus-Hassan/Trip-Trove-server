const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 3000

// middle ware

app.use(cors())
app.use(express.json())







app.get('/', (req, res) => {
    res.send('This is TripTrove-server')
  })
  
  app.listen(port, () => {
    console.log(`TripTrove-server running on port ${port}`)
  })