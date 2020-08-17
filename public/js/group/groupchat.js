//const user = require("../../../models/user");

/**
 * Client side
 */
$(document).ready(function(){
    var socket = io();

    /**
     * roomName
     */
    var room = $('#groupName').val();
    /**
     * Sender name or fullName
     */
    var sender = $('#sender').val();

    /**
     * listen for connect event which is emitted by backend
     */
    socket.on('connect', function(){
        console.log('yeahh user connected')

        /**
         * When user joined a room then emit join event
         * params is object -> room name
         */
        var params = {
            room : room,
            name: sender,
        }
        socket.emit('join', params, function(){
            console.log('User has joined this channel')
        })
    });

    /**
     * listen for online user event, there we get online user list
     */
    socket.on('usersList', function(user){
        var ol = $('<ol></ol>');
        // to filer online user to show only one time
        for(var i = 0; i< user.length; i++){
            ol.append('<p>'+ user[i]+'</p>')
        }
        // whenever user join userList then this will be appended
        $('#users').html(ol);
    })

    /**
     * listen newMessage event which is emitted by server side
     */
    socket.on('newMessage', function(data){
        var template = $('#message-template').html();
        var message = Mustache.render(template, {
            text: data.text,
            sender: data.from,
        })

        $('#messages').append(message);

    })


    /**
     * 
     */
    $('#message-form').on('submit', function(event){
        event.preventDefault();

        var msg = $('#msg').val();

        /**
         * emit (createMessage) event from client side, when user A send message 
         */
        socket.emit('createMessage', {
            text: msg,
            room: room,
            sender: sender,
        }, 
        // when send message is clicked then we get acknowledgement
         function(){
            $('#msg').val('');
        });
    })
});