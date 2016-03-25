"use strict"

// PG helpers
let connect = require('../../lib/helpers/pg_conn_helper.js')
let rollback = require('../../lib/helpers/rollback_helper.js')
const DB_URI = process.env.DB_URI || "postgres://localhost/flux_todo_dev"


let index = (req, res) => {
  connect(DB_URI, (err, client, done) => {
    if(err) console.error(err)

    client.query("SELECT * FROM list", (err, result) => {
      res.json(result.rows)
      done()
    })
  })
}

module.exports = index
