"use strict"

let rollback = (client, err, res, done) => {
  client.query("ROLLBACK", () => {
    console.error(err)
    res.json({error: err})
    done()
  })
}

module.exports = rollback
