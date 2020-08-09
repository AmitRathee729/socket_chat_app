/**
 * Server side 
 */
module.exports = function(io){
    io.on('connection', (socket) => {
        console.log('user connected');

        /**
         * listen createMessage event from client side
         *
         */
        socket.on('createMessage',(message) => {
            console.log(message);
        })
    })
}