const path = require('path'); // inbuild library
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

// console.log(__dirname + '/../public');  // earlier we used it
// console.log(publicPath); // now this will be used

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected');
    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and Room name are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);        // Remove user with id
        users.addUser(socket.id, params.name, params.room);         // then add that user
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();
    });

    //--challenge--

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

    socket.on('createMessage', (message, callback) => {
        //console.log('Create Message', message);
        //---- io emits message to every single connection
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)) {
        io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
        //---- broadcast send message to everyone but not user
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if(user){
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        // console.log('User is disconnected');
        var user = users.removeUser(socket.id);
        
                   if(user) {
                    io.to(user.room).emit('updateUserList', users.getUserList(user.room));   
                    io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
                   }
    });
});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});