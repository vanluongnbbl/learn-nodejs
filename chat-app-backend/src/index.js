const express = require('express')
const path = require('path')
const cors = require("cors");
const http = require('http')
const socketIo = require('socket.io')

const app = express()
const port = process.env.PORT || 8000

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

const server = http.createServer(app)
const io = socketIo(server)
app.use(cors());

io.on('connection', (socket) => {
    console.log('New Websocket connection')
}) 

server.listen(port, () => {
    console.log('Server is up on port ' + port)
})