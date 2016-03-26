"use strict"

// PG helpers
let connect = require('../../lib/helpers/pg_conn_helper.js')
let rollback = require('../../lib/helpers/rollback_helper.js')
const DB_URI = process.env.DB_URI || "postgres://localhost/flux_todo_dev"

let create = (req, res) => {
  connect(DB_URI, (err, client, done) => {
    if (err) console.error(err)

    let subject = req.body.subject
    let details = req.body.details

    // atomic insertion/select so that if there is an error it can be communicated
    // this also a json response
    client.query("BEGIN", (err) => {
      if(err){
        rollback.run(client, err, res, done)
      }
      client.query("INSERT INTO list(subject, details) VALUES($1, $2)", [subject, details], (err) => {
        if(err){
          rollback.run(client, err, res, done)
        }

        client.query("SELECT * FROM list", (err, results) => {
          if(err){
            rollback.run(client, err, res, done)
          }
          client.query("COMMIT", (err) => {
            if(err){
              rollback.run(client, err, res, done)
            }
            res.json(results.rows)
            done()
          })
        })
      })
    })
  })
}

  module.exports = create
