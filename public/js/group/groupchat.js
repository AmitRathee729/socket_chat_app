/**
 * Client side
 */
$(document).ready(function(){
    var socket = io();

    /**
     * listen for connect event which is emitted by backend
     */
    socket.on('connect', function(){
        console.log('yeahh user connected')
    });


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
            text: msg
        });

        /**
         * listen newMessage event which is emitted by server side
         */
        socket.on('newMessage', function(data){
            console.log(data);
        })
    })
});