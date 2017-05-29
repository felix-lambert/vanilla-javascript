var http = require('http');
const fs = require('fs')
const getExtension = require('./lib/path')

this.server = http.createServer(function (request, response) {
    let filePath = '.' + request.url
    if (filePath == './')
      filePath = './index.html'
    const extname = getExtension(filePath)
    let contentType = 'text/html'
    console.log(extname)
    switch (extname) {
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
    }

    fs.readFile(filePath, function(error, content) {
      if (error) {
        fs.readFile('./404.html', function(error, content) {
          response.writeHead(404, { 'Content-Type': contentType });
          response.end(content, 'utf-8')
        })
      } else {
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content, 'utf-8');
      }
    });
});

exports.listen = function () {
  this.server.listen.apply(this.server, arguments);
};

exports.close = function (callback) {
  this.server.close(callback);
};

