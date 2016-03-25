"use strict"

let express = require('express')
let bodyparser = require('body-parser')
let morgan = require('morgan')
let hbs = require('hbs')

let app = express()

app.set('view-engine', hbs)

//middleware
app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended: true}))
app.use(morgan('dev'))

//routing
app.use('/', require('./routes/index.js'))
app.use('/api', require('./routes/api.js'))

let port = process.env.PORT || 3000

app.listen(port, function(err){
  if(err) console.error(err)

  console.log(`listening on ${port} :)`)
})

module.exports = app
