"use strict"

let pg = require('pg')
let update = require ('../../../routes/api/update.js')
require('../../helpers/test_helpers.js')()

describe("Update Route Mocks", () => {
  let client, connectStub, reqMock

  beforeEach(() => {
    client = { query: spy() }
    connectStub = stub(pg, 'connect').yields(null, client)
    reqMock = {body: {subject: "test", details: "test", completed: true}, params: {id: 1}}
  })

  afterEach(() => {
    pg.connect.restore()
  })

  it("Should call a DB Query", () => {
    update(reqMock)
    expect(connectStub.callCount).to.eq(1)
    expect(client.query.callCount).to.eq(1)
  })

})

describe("Update Route Test DB", () => {

})
