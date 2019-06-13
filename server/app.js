if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = 3000
const index = require('./routers/index.js')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', index)
app.use(errorHandler)
app.listen(port, () => console.log('listening to port :', port))    