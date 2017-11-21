const path = require('path'); // inbuild library
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// console.log(__dirname + '/../public');  // earlier we used it
// console.log(publicPath); // now this will be used

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
io.on('connection', (socket) => {
    console.log('New User Connected');

    socket.on('disconnect', () => {
        console.log('User is disconnected');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});