"use strict"

let express = require('express')

// PG helpers
let connect = require('../lib/helpers/pg_conn_helper.js')
let rollback = require('../lib/helpers/rollback_helper.js')
const DB_URI = process.env.DB_URI || "postgres://localhost/flux_todo_dev"

let router = express.Router()

// a different way to try isolating testing differently

router.get('/', require('./api/index.js'))
router.post('/', require('./api/create.js'))
router.get('/:id', require('./api/show.js'))
router.put('/:id', require('./api/update.js'))
router.delete('/:id', require('./api/destroy.js'))

module.exports = router
