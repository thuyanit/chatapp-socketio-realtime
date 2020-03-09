const express = require("express");
const socketIO  = require("socket.io");
const http = require("http"); //build in NodeJS
const path = require("path"); //build in nodejs
const Room = require('./models/Room');
const room = new Room();

const {generateMessage, generateLocation} = require('./messageTemplates/mesage');

const app = express();
const publicPath = path.join(__dirname+'/../public');
app.use('/', express.static(publicPath));

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) =>{
    //console.log("New User joined");
    socket.on("newUser", msg=>{
        const newUser = room.addUser(socket.id, msg.name, msg.room);
        socket.join(newUser.room);

        socket.on('msgFromClient', msg=>{
            console.log(msg);
            io.to(newUser.room).emit('msgFromServer', generateMessage(
                msg.from,
                msg.content
            ));
        })
    
        //Send location
        socket.on('locationFromClient', msg=>{
            io.to(newUser.room).emit('locationFromServer', generateLocation(
                msg.from,
                msg.lat,
                msg.lng
            ));
        })
    
        io.emit("listOfUsers", {
            users: room.findUserByRoomName(newUser.room)
        })

        socket.to(newUser.room).broadcast.emit("newUser", generateMessage(
            'admin',
            'Have a user joined'
        ))

        socket.emit('wellcome', generateMessage(
            'admin',
            'Wellcome to the chatapp'
        ))

        socket.on("disconnect", () => {
            //console.log("User disconnected");
           const removedUser = room.removeUserById(socket.id);
            if(removedUser){
               io.to(newUser.room).emit("msgFromServer", generateMessage(
                   'Admin',
                   `${removedUser.name} left room.`
               ))
            }

            io.emit("listOfUsers", {
                users: room.findUserByRoomName(newUser.room)
            })
        })
    })

})

const port = process.env.PORT || 8000;
server.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});