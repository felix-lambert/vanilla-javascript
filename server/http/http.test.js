const server = require('./http')
const http = require('http')
const assert = require('chai').assert
const fs = require('fs')

const HOMEPAGE_FILE = './generated/test/test.html'
const FILE_NOT_FOUND_PATH = './generated/test/404.html'

describe('server', () => {
  describe('#http responses', () => {
    it('should tearDown', (done) => {
      cleanUpFile(HOMEPAGE_FILE)
      cleanUpFile(FILE_NOT_FOUND_PATH)
      done()
    })

    it('server should serve a file', (done) => {
      const expectedData = 'This is served from a file'

      fs.writeFileSync(HOMEPAGE_FILE, expectedData)
      httpGet('http://localhost:8002', HOMEPAGE_FILE, FILE_NOT_FOUND_PATH, (response, responseData) => {
        assert.equal(200, response.statusCode, 'status code')
        assert.equal(expectedData, responseData, 'response text')
        done()
      })
    })

    it('should return 200 when we are at the root of the repository', (done) => {
      httpGet('http://localhost:8002', HOMEPAGE_FILE, FILE_NOT_FOUND_PATH, (response, responseData, gettingDataFromClient) => {
        assert.ok(gettingDataFromClient, 'should have receive response data')
        assertGoodStatusCode(response.statusCode, 200)
        done()
      })
    })

    it('should return 200 when it\'s a css file that is rendered', (done) => {
      httpGet('http://localhost:8002/app.css', null, FILE_NOT_FOUND_PATH, (response, responseData, gettingDataFromClient) => {
        const contentType = response.headers['content-type']
        assert.ok(gettingDataFromClient, 'should have receive response data')
        assert.equal(contentType, 'text/css', 'The content type of the file should be app/css')
        assertGoodStatusCode(response.statusCode, 200)
        done()
      })
    })

    it('should return 200 when there is no js file rendered', (done) => {
      httpGet('http://localhost:8002/app.js', HOMEPAGE_FILE, FILE_NOT_FOUND_PATH, (response, responseData, gettingDataFromClient) => {
        assert.ok(gettingDataFromClient, 'should have receive response data')
        assertGoodStatusCode(response.statusCode, 200)
        done()
      })
    })

    it('should close the server', (done) => {
      server.stop(() => {
        done()
      })
    })

    it('should return 404 when it\'s the wrong file that is rendered', (done) => {
      httpGet('http://localhost:8002/wrongFile.js', './wrongPath.html', FILE_NOT_FOUND_PATH, (response, responseData, gettingDataFromClient) => {
        assertGoodStatusCode(response.statusCode, 404)
        done()
      })
    })

    it(`should throw exception when no port number`, (done) => {
      assert.throws(server.start, Error, 'port number is required')
      done()
    })

    it(`should return Page Not Found when we can't find 404.html`, (done) => {
      httpGet('http://localhost:8002/wrongFile.js', null, 'wrong404.htmlPath', (response, responseData, gettingDataFromClient) => {
        assertGoodStatusCode(response.statusCode, 404)
        done()
      })
    })

    it('should return 404 when we pass an invalid file to the server', (done) => {
      httpGet('http://localhost:8002', './wrongPath', 'wrong404.htmlPath', (response, responseData, gettingDataFromClient) => {
        assertGoodStatusCode(response.statusCode, 404)
        done()
      })
    })
  })
})

function httpGet (url, renderFilePath, fileNotFoundPath, callback) {
  server.start(8002, renderFilePath, fileNotFoundPath)
  const request = http.get(url)
  request.on('response', (response) => {
    let receivedData = ''
    let gettingDataFromClient = false

    response.on('data', (chunk) => {
      receivedData += chunk
      gettingDataFromClient = true
    })
    response.on('end', () => {
      server.stop(() => {
        callback(response, receivedData, gettingDataFromClient)
      })
    })
  })
}

function cleanUpFile (file) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file)
    assert.ok(!fs.existsSync(HOMEPAGE_FILE), `could not delete test file: ["${HOMEPAGE_FILE}"]`)
  }
}

const assertGoodStatusCode = (statusCode, expectedStatusCode) => assert.equal(statusCode, expectedStatusCode, 'the status code should be correct')
