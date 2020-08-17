/**
 * Server side 
 */
module.exports = function(io, Users){
    // added new constructor
    const users = new Users();

    io.on('connection', (socket) => {
        console.log('user connected');

        /**
         * listen for join event 
         */
        socket.on('join', (params, callback) => {
            // when user join -> use join method which is in socket and this will take room name in parameter
            socket.join(params.room);

            // add usersdata from UsersClass
            // params
            users.AddUserData(socket.id, params.name , params.room);
            console.log(users)

            // by usersList event all users connected to this room,will listen for this event and also get online users of this room
            io.to(params.room).emit('usersList', users.GetUsersList(params.room));

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

        /**
         * disconnect event when user is disconnect
         */
        socket.on('disconnect', () => {
            var user = users.RemoveUser(socket.id);

            if (user){
            // by usersList event all users connected to this room,will listen for this event and also get online users of users
            io.to(user.room).emit('usersList', users.GetUsersList(user.room));
            }
        })
    });
}