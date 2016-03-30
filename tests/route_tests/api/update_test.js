"use strict"

let pg = require('pg')
let update = require ('../../../routes/api/update.js')
require('../../helpers/test_helpers.js')()

describe("Update Route Mocks", () => {
  let client, connectStub, reqMock, querySpy

  beforeEach(() => {
    querySpy = spy()
    client = { query: querySpy }
    connectStub = stub(pg, 'connect').yields(null, client)
    reqMock = {body: {subject: "test", details: "test", completed: true}, params: {id: 1}}
  })

  afterEach(() => {
    pg.connect.restore()
  })

  it("Should call a DB query to update the database", () => {
    update(reqMock)
    expect(connectStub.callCount).to.eq(1)
    expect(querySpy.calledOnce).to.be.true
  })

})
