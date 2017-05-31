const port = 8001
const server = require('./server/http')

server.listen(port)
console.log(`Server listens to port ${port}`)