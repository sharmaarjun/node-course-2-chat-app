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

    //shown to client from server
    // socket.emit('newEmail', {
    //     from: 'Arjun@gmail.com',
    //     text: 'Hey you are doing gud',
    //     createAt: 123
//});
    // socket.emit('newMessage', {         // socket emits message to single connection
    //     from: 'arjun@server.cc',
    //     text: 'I am starting the new chat app',
    //     createdAt: 0834
    // });

    //shown to server from client
    // socket.on('createEmail', (newEmail) =>{
    //     console.log('Create Email', newEmail);
    // });

    socket.on('createMessage', (message) => {
        console.log('Create Message', message);
        //---- io emits message to every single connection
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('User is disconnected');
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});