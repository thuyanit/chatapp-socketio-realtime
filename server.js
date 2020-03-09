const express = require("express");
const socketIO  = require("socket.io");
const http = require("http"); //build in NodeJS
const path = require("path"); //build in nodejs

const app = express();
const publicPath = path.join(__dirname+'/../public');
app.use('/', express.static(publicPath));

const server = http.createServer(app);
const io = socketIO(server);



const port = process.env.PORT || 8000;
server.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});