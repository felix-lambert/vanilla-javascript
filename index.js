const port = 8000
const server = require('./server/http')

server.listen(port)
console.log(`Server listens to port ${port}`)