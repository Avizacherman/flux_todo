"use strict"

let rollback = require ('../../lib/helpers/rollback_helper.js')
require('../helpers/test_helpers.js')()

describe("Testing Rollback Helper", () => {

  it("Should call a ROLLBACK query", (done) =>{
    let queryStub = stub()
    let clientMock = {query: queryStub}

    rollback.run(clientMock)

    expect(queryStub.withArgs("ROLLBACK").calledOnce).to.be.true

    done()
  })

  it("Should send an error JSON", (done) => {
    let jsonSpy = spy()
    let resMock = {json: jsonSpy}

    let queryStub = stub()
    let clientMock = {query: queryStub.yields(null)}

    rollback.run(clientMock, null, resMock, function(){ done() })

    expect(jsonSpy.calledOnce).to.be.true
    expect(jsonSpy.args[0][0]).to.have.property('error', 'Something went wrong')
  })

})
