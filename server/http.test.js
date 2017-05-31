const server = require('./http')
const http = require('http');
const expect = require("chai").expect

describe('server', () => {
  before(() => {
    server.listen(8001)
  })

  describe('#http responses', function () {

    it('should return 200 when we are at the root of the repository', (done) => {
      http.get('http://localhost:8001', (res) => {
        expect(res.statusCode).to.equal(200)
        done()
      })
    })

    it('should return 404 when it\'s the wrong file that is rendered', (done) => {  
      http.get('http://localhost:8001/wrongFile', (res) => {
        expect(res.statusCode).to.equal(404)
        done()
      })
    })

    it('should return 200 when it\'s a css file that is rendered', (done) => {      
      http.get('http://localhost:8001/app.css', (res) => {
        expect(res.statusCode).to.equal(200)
        done()
      })
    })

    it('should return 404 when there is no js file rendered', (done) => {      
      http.get('http://localhost:8001/app.js', (res) => {
        expect(res.statusCode).to.equal(404)
        done()
      })
    })

    it('should return 200 when it\'s a js file that is rendered', (done) => {      
      http.get('http://localhost:8001/javascript/app.js', (res) => {
        expect(res.statusCode).to.equal(200)
        done()
      })
    })
  })

  after(() => {
    server.close()
  });
});