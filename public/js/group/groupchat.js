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
     * listen for connect event which is emitted by backend
     */
    socket.on('connect', function(){
        console.log('yeahh user connected')

        /**
         * When user joined a room then emit join event
         * params is object -> room name
         */
        var params = {
            room : room
        }
        socket.emit('join', params, function(){
            console.log('User has joined this channel')
        })
    });

    /**
     * listen newMessage event which is emitted by server side
     */
    socket.on('newMessage', function(data){
        console.log(data);
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
            room: room
        }, 
        // when send message is clicked then we get acknowledgement
         function(){
            $('#msg').val('');
        });
    })
});