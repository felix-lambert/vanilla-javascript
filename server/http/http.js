const http = require('http')
const fs = require('fs')
const getExtension = require('../lib/path')

function getPathFromUrl(url) {
  let filePath = './client' + url
  if (filePath == './client/')
    filePath = './client/index.html'
  return filePath
}

function getFileTypeUsingExtensionName(extname) {
  let contentType = 'text/html'
  switch (extname) {
    case '.js':
      contentType = 'text/javascript'
      break;
    case '.css':
      contentType = 'text/css'
      break;
  }
  return contentType
}

const server = http.createServer((request, response) => {
  console.log('inside http')
  const filePath = getPathFromUrl(request.url)
  const extname = getExtension(filePath)
  const contentType = getFileTypeUsingExtensionName(extname)

  fs.readFile(filePath, (error, content) => {
    if (error) {
      fs.readFile('./client/404.html', function(error, content) {
        response.writeHead(404, { 'Content-Type': contentType })
        response.end(content, 'utf-8')
      })
    } else {
      response.writeHead(200, { 'Content-Type': contentType })
      response.end(content, 'utf-8')
    }
  })
})

exports.listen = function (port) {
  server.listen(port)
}

exports.close = function () {
  server.close()
}

