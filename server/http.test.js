const server = require('./http')
const http = require('http');
const expect = require("chai").expect

describe('server', function () {
  before(function () {
    server.listen(8000);
  });

  describe('#http responses', function () {

    it('should return 200 when it\'s the good file that is rendered', (done) => {
    
      http.get('http://localhost:8000', (res) => {
        expect(res.statusCode).to.equal(200)
        done()
      })
    })

    it('should return 404 when it\'s the wrong file that is rendered', (done) => {
      
      http.get('http://localhost:8000/wrongFile', (res) => {
        expect(res.statusCode).to.equal(404)
        done()
      })
    })

    it('should return 200 when it\'s a css file that is rendered', (done) => {      
      http.get('http://localhost:8000/app.css', (res) => {
        expect(res.statusCode).to.equal(200)
        done()
      })
    })

    it('should return 200 when it\'s a js file that is rendered', (done) => {      
      http.get('http://localhost:8000/app.js', (res) => {
        expect(res.statusCode).to.equal(200)
        done()
      })
    })
  });


  after(function () {
    server.close();
  });
});