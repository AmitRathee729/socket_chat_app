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
     * emit (createMessage) event from client side, when user A send message
     */
    $('#message-form').on('submit', function(event){
        event.preventDefault();

        var msg = $('#msg').val();

        /**
         * In event, first 
         */
        socket.emit('createMessage', {
            text: msg
        });
    })
});