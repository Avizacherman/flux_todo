"use strict"

let pg = require('pg')
let create = require ('../../../routes/api/create.js')
let rollback = require ('../../../lib/helpers/rollback_helper.js')

require('../../helpers/test_helpers.js')()

describe("Create Route Tests", () => {
  let client, connectStub, reqMock, resMock, queryStub

  beforeEach(() => {

    resMock = { data: {},
      json: function(obj){
      this.data = obj }
    }

    reqMock = {body: {subject: "test", details: "test"}}
  })

  afterEach(() => {
    pg.connect.restore()
  })

  it("Should run 4 queries on a succesful create call", (done) => {
    queryStub = stub()
    queryStub.onCall(0).yields(null)
    queryStub.onCall(1).yields(null)
    queryStub.onCall(2).yields(null, {rows: []})
    queryStub.onCall(3).yields(null)

    queryStub.yields(null, {rows: []})

    client = { query: queryStub}
    connectStub = stub(pg, 'connect').yields(null, client, function(){ done() })

    create(reqMock, resMock)
    expect(connectStub.callCount).to.eq(1)
    expect(queryStub.callCount).to.eq(4)
  })

  it("Should make an INSERT query on a succesful call", (done) => {
    queryStub = stub()
    queryStub.yields(null, {rows: []})

    client = { query: queryStub}
    connectStub = stub(pg, 'connect').yields(null, client, function(){ done() })

    create(reqMock, resMock)
    expect(connectStub.callCount).to.eq(1)
    expect(queryStub.withArgs(match(/INSERT INTO [0-z (),$]+/)).calledOnce).to.be.true
  })

  it("Should call the rollback helper on an error", (done) => {
    queryStub = stub()
    let err = new Error("Could not query from the database")

    queryStub.onCall(0).yields(null)
    queryStub.onCall(1).yields(err)

    client = { query: queryStub}
    connectStub = stub(pg, 'connect').yields(null, client)
    let rollbackStub = stub(rollback, 'run')

    create(reqMock)
    expect(rollbackStub.calledOnce).to.be.true

    rollback.run.restore()
    done()

  })

})
