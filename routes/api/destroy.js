"use strict"

// PG helpers
let connect = require('../../lib/helpers/pg_conn_helper.js')
let rollback = require('../../lib/helpers/rollback_helper.js')
const DB_URI = process.env.DB_URI || "postgres://localhost/flux_todo_dev"


let destroy = (req, res) => {
  connect(DB_URI, (err, client, done) => {
    if(err) console.error(err)
    client.query('DELETE FROM list WHERE id=$1', [req.params.id], (err, results) => {
      if(err) {
        console.error(err)
        res.json(err)
      }
      else {
        res.json({success: "record deleted"})
      }


      done()
    })
  })
}

module.exports = destroy
