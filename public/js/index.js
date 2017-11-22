var socket = io();

        socket.on('connect', function() {
            console.log('Connected to Server');

            //to be shown to server
            // socket.emit('createEmail',  {
            //     to: 'jia@chia.chi',
            //     text: 'Hey this is arjun'
            // });

            socket.emit('createMessage', {
                from: 'chrome@gg.cc',
                text: 'me replying to you chat message'
            });
        });

        socket.on('disconnect', function() {
            console.log('Disconnected with the server');
        });

        // socket.on('newEmail', function(email) {
        //     console.log('New Email', email);
        // });

        socket.on('newMessage', function(message) {
            console.log('New Message', message)
        });