class Users {
    constructor(){
        this.users = [];
    }

    // get all online users id, name and room
    AddUserData(id, name, room) {
        var users = {
            id: id,
            name: name,
            room: room,
        }

        // push online user to users Array
        this.users.push(users);
        return users
    }

    /**
     * get list of online user in a particular room
     */
    GetUsersList(room){
        // filter users --> match with user room
        var users = this.users.filter((user) => {
            return user.room === room;
        });

        // map will return name of filtered users
        var namesArray = users.map((user) => {
            return user.name;
        })
        return namesArray;
    }
}

module.exports = {Users};