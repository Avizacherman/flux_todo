"use strict"

// PG helpers
let connect = require('../../lib/helpers/pg_conn_helper.js')
let rollback = require('../../lib/helpers/rollback_helper.js')
const DB_URI = process.env.DB_URI || "postgres://localhost/flux_todo_dev"

let show = (req, res) => {
  connect(DB_URI, (err, client, done) => {
    if(err) console.error(err)
    client.query('SELECT * FROM list WHERE id=$1', [req.params.id], (err, results) => {
      if(err) console.error(err)

      if(results.rows[0]){

        res.json(results.rows[0])
      } else {
        res.json({error: "No Such Record"})
      }

      done()
    })
  })
}

module.exports = show
