"use strict"

let pg = require('pg')
let update = require ('../../../routes/api/update.js')
require('../../helpers/test_helpers.js')()

describe("Update Route Mocks", () => {


  it("Should call a DB Query", () => {
    let client = { query: spy() }
    let connectStub = stub(pg, 'connect').yields(null, client)
    let reqMock = {body: {subject: "test", details: "test", completed: true}, params: {id: 1}}

    update(reqMock)
    expect(connectStub.callCount).to.eq(1)
    expect(client.query.callCount).to.eq(1)
  })

})

describe("Update Route Test DB", () => {

})
