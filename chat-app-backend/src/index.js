const express = require('express')
const path = require('path')
var Filter = require('bad-words')

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
    socket.on('chat message', (msg, callback) => {
        const filter = new Filter();

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.emit('message', filter.clean(msg))
        callback('delivered')
    })
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })


    // location
    socket.on('send-location', (coords, callback) => {
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)

        callback('Location sent!')
    })

    socket.broadcast.emit('location', 'new locaiton')
}) 

server.listen(port, () => {
    console.log('Server is up on port ' + port)
})