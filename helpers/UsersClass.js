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

    /***
     * remove user from online list if they are disconnected
     */
    RemoveUser(id){
        var user = this.GetUser(id);
        console.log('from remove method', user)
        if (user) {
            this.users = this.users.filter((user) => user.id != id);
        }
        return user;
    }

    /***
     * fiter online users to not come multiple times in online list
     */
    GetUser(id){
        // filter user id is already exits
        var getUser = this.users.filter((userId) => {
            return userId.id == id;
        })[0];      // if exits then return index 0 of same multiple users id
        return getUser;
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