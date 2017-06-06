const http = require('http')
const fs = require('fs')
const getExtension = require('../lib/path')

let server

function renderContent (response, statusCode, fileContentType, renderedData) {
  response.writeHead(404, { 'Content-Type': fileContentType })
  response.end(renderedData, 'utf-8')
}

exports.start = (portNumber, fileToServe, fileNotFoundPath) => {
  if (!portNumber) {
    throw new Error('port number is required')
  }
  server = http.createServer()
  server.on('request', (request, response) => {
    let filePath
    if (!fileToServe) {
      filePath = './client' + request.url
      if (filePath === './client/') {
        filePath = './client/index.html'
      }
    } else {
      filePath = fileToServe
    }
    const extensionName = getExtension(filePath)
    const fileContentType = getFileTypeUsingExtensionName(extensionName)
    fs.readFile(filePath, (error, data) => {
      if (error) {
        fs.readFile(fileNotFoundPath, (err, content) => {
          if (err) {
            renderContent(response, 404, fileContentType, `Page not found`)
          }
          response.writeHead(404, { 'Content-Type': fileContentType })
          response.end()
        })
      } else {
        response.writeHead(200, { 'Content-Type': fileContentType })
        response.end(data)
      }
    })
  })
  server.listen(portNumber)
}

exports.stop = callback => server.close(callback)

const getFileTypeUsingExtensionName = extensionName => {
  let fileContentType = 'text/html'
  switch (extensionName) {
    case '.js':
      fileContentType = 'text/javascript'
      break
    case '.css':
      fileContentType = 'text/css'
      break
  }
  return fileContentType
}
