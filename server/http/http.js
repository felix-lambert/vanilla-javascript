const http = require('http')
const fs = require('fs')
const getExtension = require('../lib/path')

const server = http.createServer((request, response) => {
  const filePath = getPathFromUrl(request.url)
  const extensionName = getExtension(filePath)
  const fileContentType = getFileTypeUsingExtensionName(extensionName)

  fs.readFile(filePath, (error, content) => {
    if (error) {
      fs.readFile('./client/404.html', (err, content) => {
        if (err) {
          throw err
        }
        response.writeHead(404, { 'Content-Type': fileContentType })
        response.end(content, 'utf-8')
      })
    } else {
      response.writeHead(200, { 'Content-Type': fileContentType })
      response.end(content, 'utf-8')
    }
  })
})

exports.listen = (port) => server.listen(port)

exports.close = () => server.close()

const getPathFromUrl = (url) => {
  let filePath = './client' + url
  if (filePath === './client/') {
    filePath = './client/index.html'
  }
  return filePath
}

const getFileTypeUsingExtensionName = (extensionName) => {
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
