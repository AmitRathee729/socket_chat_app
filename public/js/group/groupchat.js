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
    })
});