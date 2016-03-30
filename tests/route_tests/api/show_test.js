"use strict"

let pg = require('pg')
let app = require('../../../app.js')
let show = require ('../../../routes/api/show.js')
require('../../helpers/test_helpers.js')()

describe("Show Routes", () => {

  let reqMock, resMock, clientMock, connectStub, queryStub, jsonSpy

  beforeEach( () => {

    reqMock = {params: {id: 1}}
    jsonSpy = spy()
    resMock = {
      json: jsonSpy
      }
    queryStub = stub()
  })

  afterEach( () => {
    pg.connect.restore()
  })

  it("Should send data from the DB", () => {
    let fakeData = { rows: [{id: 1, subject: 'Do it'}] }
    clientMock = { query: queryStub }
    connectStub = stub(pg, 'connect').yields(null, clientMock, spy())
    queryStub.callsArgWith(2, null, fakeData)

    show(reqMock, resMock)
    expect(jsonSpy.called).to.be.true
    expect(jsonSpy.args[0][0]).to.have.property('id', 1)
    expect(jsonSpy.args[0][0]).to.be.have.property('subject', 'Do it')
  })

  it("Should send an error JSON if no data is retreived", () => {
    clientMock = { query: queryStub }
    connectStub = stub(pg, 'connect').yields(null, clientMock, spy())
    queryStub.callsArgWith(2, null, {rows: []})

    show(reqMock, resMock)
    expect(jsonSpy.args[0][0]).to.be.an('object')
    expect(jsonSpy.args[0][0]).to.have.property('error', 'No Such Record')

  })
})

//integration test example

describe("Show Route Integration Test", () => {

  before(() => {
    let results = {rows: [{id: 5, subject: "Test", details: "This is only a test", completed: true}]}
    let queryStub = stub()
    queryStub.yields(null, results)
    let clientMock = {query: queryStub }
    let connectStub = stub(pg, 'connect').yields(null, clientMock, spy())
  })

  after(() => {
    pg.connect.restore()
  })

  it("Should send a JSON with data from the database", (done) => {
    request(app).get('/api/5').end((err, res) => {
      expect(res).to.be.json
      expect(res.body).to.have.property('id', 5)
      expect(res.body).to.have.property('subject', 'Test')
      expect(res.body).to.have.property('details', 'This is only a test')
      expect(res.body).to.have.property('completed', true)
      done()
    })
  })
})
