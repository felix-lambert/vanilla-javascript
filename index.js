const PORT = 8001
const server = require('./server/http/http')

server.start(PORT, './client/index.html', './client/404.html')

console.log(`Server listens to port ${PORT}`)
