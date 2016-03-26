"use strict"

let rollback = (client, err, res, done) => {
  client.query("ROLLBACK", () => {
    console.error(err)
    res.json({error: "Something went wrong"})
    done()
  })
}

module.exports = { run: rollback }
