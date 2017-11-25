var socket = io();

        socket.on('connect', function() {
            console.log('Connected to Server');

            //to be shown to server
            // socket.emit('createEmail',  {
            //     to: 'jia@chia.chi',
            //     text: 'Hey this is arjun'
            // });

            // socket.emit('createMessage', {
            //     from: 'chrome@gg.cc',
            //     text: 'me replying to you chat message'
            // });
        });

        socket.on('newMessage', function(message) {
            console.log('New Message', message);
            var li = jQuery('<li></li>');
            li.text(`${message.from}:  ${message.text}`);

            jQuery('#messages').append(li);
        });

        // socket.emit('createMessage', {
        //     from: 'Frank',
        //     text: 'Hello brother'
        // }, function (data) {
        //     console.log('Got it', data);
        // });

        // socket.on('newEmail', function(email) {
        //     console.log('New Email', email);
        // });

        jQuery('#message-form').on('submit', function(e) {
            e.preventDefault();

            socket.emit('createMessage', {
                from: 'User',
                text: jQuery('[name=message]').val(),
            }, function() {

            });
        });

        socket.on('disconnect', function() {
            console.log('Disconnected with the server');
        });