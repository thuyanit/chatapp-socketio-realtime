class Room {
    constructor() {
        this.users = []
    }

    addUser(id, name, room){
        const user = {id, name, room};
        this.users.push(user);
        return user;
    }

    findUserById(id){
        const user = this.users.find(elm => elm.id = id);
        return user;
    }

    findUserIndex(id) {
        return this.users.findIndex(elm=>elm.id = id);
    }

    removeUserById(id){
        const index = this.findUserIndex(id);

        const removedUser = this.users[index]
        this.users.splice(index,1);

        return removedUser;
    }

    findUserByRoomName(roomName){
        return this.users.filter(elm=>elm.room == roomName);
    }
}

module.exports = Room;