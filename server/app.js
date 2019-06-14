if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const error = require("./helpers/error")
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const index = require('./routers/index.js')
const cors = require('cors')
const mongoose = require("mongoose")
const url = process.env.DATABASE_URL

<<<<<<< HEAD
mongoose.connect(url, {useNewUrlParser: true})
.then(()=>{
  console.log('database connected')
=======
mongoose.connect(url, {
  useNewUrlParser: true
>>>>>>> rapi2
})

app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', index)
<<<<<<< HEAD
<<<<<<< HEAD

=======
app.listen(port, ()=>{console.log('listening to port', port)})
>>>>>>> added listen
app.use(error)

app.listen(port, () => console.log('listening to port :', port))    
=======
app.use(error)

app.listen(port, () => {
  console.log('listening to port', port)
})
>>>>>>> rapi2
