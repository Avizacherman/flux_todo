"use strict"

let pg = require('pg')
let show = require ('../../../routes/api/show.js')
require('../../helpers/test_helpers.js')()

describe("Show Routes", () => {


  it("Should retrieve data from the DB", function(done){
    let req = {params: {id: 1}}
    let res = { data: {},
      json: function(obj){
        this.data = obj }
    }
    show(req, res)
    setTimeout(function() {
      expect(res.data.id).to.eq(1)
      expect(res.data.subject).to.eq('Do it')
      expect(res.data).to.be.an('array')
      done()
    }, 100)
  })

})
