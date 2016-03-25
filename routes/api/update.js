"use strict"


// PG helpers
let connect = require('../../lib/helpers/pg_conn_helper.js')
let rollback = require('../../lib/helpers/rollback_helper.js')
const DB_URI = process.env.DB_URI || "postgres://localhost/flux_todo_dev"


let update = (req, res) => {
  connect(DB_URI, (err, client, done) => {
    if(err) console.error(err)

    let subject = req.body.subject
    let details = req.body.details
    let completed = req.body.completed

    client.query('UPDATE list SET subject=$1, details=$2, completed=$3 WHERE id=$4',
    [subject, details, completed, req.params.id], (err, results) => {
      if(err) console.error(err)

        res.json(results.rows[0])

      done()
    })
  })
}

module.exports = update
