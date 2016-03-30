"use strict"

let chai = require('chai')
let chaiHttp = require('chai-http')
let sinon = require ('sinon')

chai.use(chaiHttp)

let testHelper = () => {
  process.env.DB_URI = "postgres://localhost/flux_todo_test"
  global.expect = chai.expect
  global.spy = sinon.spy
  global.stub = sinon.stub
  global.request = chai.request
  global.match = sinon.match
}

module.exports = testHelper
