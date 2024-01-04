const express = require('express')
const path = require('path')
// const cors = require("cors");
const http = require('http')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

// app.use(cors());

console.log('New Websocket connection')
let count = 0
io.on('connection', (socket) => {
    socket.emit('countUpdated', count)

    socket.on('increment', () => {
        count++
        io.emit('countUpdated', count)
    })
    
    //  chat
    socket.broadcast.emit('message', 'A new user has joined!')
    socket.emit('message', message => {
        console.log(message)
    })
    socket.on('chat message', (msg) => {
        io.emit('message', msg)
    })
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })


    // location
    socket.on('send-location', (coords) => {
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })

    socket.broadcast.emit('location', 'new locaiton')
}) 

server.listen(port, () => {
    console.log('Server is up on port ' + port)
})