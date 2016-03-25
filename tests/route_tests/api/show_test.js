"use strict"

let pg = require('pg')
let show = require ('../../../routes/api/show.js')
require('../../helpers/test_helpers.js')()

describe("Show Routes", () => {

  let req, res, client, connectStub

  beforeEach( () => {
    // Mocking request/response cycle
    // Response object has placeholder to hold data for inspection
    req = {params: {id: 1}}
    res = { data: {},
      json: function(obj){
      this.data = obj }
    }

    // create some fake data that would come back from the database
    // The query is a stub that provides its callback with this fake data
    // the connection is a stub that provides the client stub
    let fakeData = { rows: [{id: 1, subject: 'Do it'}] }
    let queryStub = stub()
    client = { query: queryStub.callsArgWith(2, null, fakeData) }
    connectStub = stub(pg, 'connect').yields(null, client, spy())

  })

  afterEach( () => {
    pg.connect.restore()
  })

  it("Should retrieve data from the DB", (done) => {
    show(req, res)
    expect(res.data.id).to.eq(1)
    expect(res.data.subject).to.eq('Do it')
    expect(res.data).to.be.an('object')
    done()
  })
})
