const server = require('./http')
const http = require('http');
const assert = require('chai').assert

describe('server', () => {
  before(() => {
    server.listen(8002)
  })

  describe('#http responses', function () {

    it('should return 200 when we are at the root of the repository', (done) => {
      http.get('http://localhost:8002', (res) => {
        assertGoodStatusCode(res.statusCode, 200)
        done()
      })
    })

    it('should return 404 when it\'s the wrong file that is rendered', (done) => {  
      http.get('http://localhost:8002/wrongFile', (res) => {
        assertGoodStatusCode(res.statusCode, 404)
        done()
      })
    })

    it('should return 200 when it\'s a css file that is rendered', (done) => {      
      http.get('http://localhost:8002/app.css', (res) => {
        assertGoodStatusCode(res.statusCode, 200)
        done()
      })
    })

    it('should return 404 when there is no js file rendered', (done) => {      
      http.get('http://localhost:8002/app.js', (res) => {
        assertGoodStatusCode(res.statusCode, 404)
        done()
      })
    })

    it('should return 200 when it\'s a js file that is rendered', (done) => {      
      http.get('http://localhost:8002/javascript/app.js', (res) => {
        assertGoodStatusCode(res.statusCode, 200)
        done()
      })
    })
  })

  after(() => {
    server.close()
  })
})

assertGoodStatusCode = (statusCode, expectedStatusCode) => assert.equal(statusCode, expectedStatusCode, 'the status code should be correct')
