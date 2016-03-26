"use strict"

let pg = require('pg')
let show = require ('../../../routes/api/show.js')
require('../../helpers/test_helpers.js')()

describe("Show Routes", () => {

  let reqMock, resMock, client, connectStub, queryStub

  beforeEach( () => {
    // Mocking request/response cycle
    // Response object has placeholder to hold data for inspection
    reqMock = {params: {id: 1}}
    resMock = { data: {},
      json: function(obj){
      this.data = obj }
    }

    queryStub = stub()

  })

  afterEach( () => {
    pg.connect.restore()
  })

  it("Should retrieve data from the DB", () => {
    let fakeData = { rows: [{id: 1, subject: 'Do it'}] }
    client = { query: queryStub }
    connectStub = stub(pg, 'connect').yields(null, client, spy())
    queryStub.callsArgWith(2, null, fakeData)

    show(reqMock, resMock)
    expect(resMock.data.id).to.eq(1)
    expect(resMock.data.subject).to.eq('Do it')
    expect(resMock.data).to.be.an('object')
  })

  it("Should send an error JSON if no data is retreived", () => {
    client = { query: queryStub }
    connectStub = stub(pg, 'connect').yields(null, client, spy())
    queryStub.callsArgWith(2, null, {rows: []})

    show(reqMock, resMock)
    expect(resMock.data).to.be.an('object')
    expect(resMock.data).to.have.property('error')
    expect(resMock.data.error).to.eq('No Such Record')
  })
})
