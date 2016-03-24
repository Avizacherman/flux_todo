"use strict"

let pg = require('pg')

let connect = (dbString, callback) => pg.connect(dbString, callback)

module.exports = connect 
