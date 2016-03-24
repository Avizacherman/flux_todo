"use strict"

let express = require('express')
let pg = require('pg')

// PG helpers
let connect = require('../lib/helpers/pg_conn_helper.js')
let rollback = require('../lib/helpers/rollback_helper.js')
const DB_URI = process.env.DB_URI || "postgres://localhost/flux_todo_dev"

let router = express.Router()

router.get('/', (req, res) => {
  connect(DB_URI, (err, client, done) => {
    if(err) console.error(err)

    client.query("SELECT * FROM list", (err, result) => {
      res.json(result.rows)
      done()
    })
  })
})

router.post('/', (req, res) => {
  connect(DB_URI, (err, client, done) => {
    if (err) console.error(err)

    let subject = req.body.subject
    let details = req.body.details

    // atomic insertion/select so that if there is an error it can be communicated
    // this also a json response
    client.query("BEGIN", (err) => {
      if(err){
        rollback(client, err, res, done)
      }

      client.query("INSERT INTO list(subject, details) VALUES(?, ?)", subject, details, (err) => {
        if(err){
          rollback(client, err, res, done)
        }

        client.query("SELECT * FROM list", (err, results) => {
          if(err){
            rollback(client, err, res, done)
          }
          
          client.query("COMMIT", (err) => {
            if(err){
              rollback(client, err, res, done)
            }

            res.json(results.rows)
            done()
          })
        })
      })
    })
  })
})

module.exports = router
