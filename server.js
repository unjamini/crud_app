const express = require('express')
const morgan = require('morgan')

const app = express()
// add logger 
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index.routes'))

app.listen('1337')