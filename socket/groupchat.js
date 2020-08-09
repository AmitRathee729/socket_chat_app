/**
 * Server side 
 */
module.exports = function(io){
    io.on('connection', (socket) => {
        console.log('user connected');

        /**
         * listen for join event 
         */
        socket.on('join', (params, callback) => {
            // when user join -> use join method which is in socket and this will take room name in parameter
            socket.join(params.room);

            callback();
        })

        /**
         * listen createMessage event from client side
         */
        socket.on('createMessage',(message, callback) => {
            console.log(message);

            /**
             * send message to everyone including sender --> io.emit()
             * 
             * io.to(where we want to emit).emit()  --> send message to a particular room
             */
            io.to(message.room).emit('newMessage', {
                text: message.text,
                room: message.room,
                from: message.sender,
            });
            /**
             * when user clicked on send then we get acknowledgement 
             */
            callback();   
        })
    })
}