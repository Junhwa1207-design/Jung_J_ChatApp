const express = require('express');
const path = require('path');
const messenger = require('socket.io')();

const app = express();

app.use(express.static("public"));

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html")); 
});

app.get("/chat", (req, res) => {
    res.sendFile(path.join(__dirname, "chat.html")); 
});


const server = app.listen(port, () => {
    console.log(`app is running on ${port}`);
});

//messenger is the connection manager - like a switchboard operator
messenger.attach(server);

//socket is the individual connection - the caller
messenger.on('connection', (socket) => {
    console.log(`a user connected: ${socket.id}`);

    //send the connected user their assigned ID
    socket.emit('connected', { sID: `${socket.id}`, message: 'new connection'});
    socket.broadcast.emit('message', 'A user has joined the caht' );
    socket.emit('connected', { sID: `${message.user}`, message: 'new connection'});
    socket.broadcast.emit('message', 'A user has joined the caht' );






    socket.on('chatmessage', function(msg) {
        console.log(msg);

        messenger.emit('message', { id: socket.id, message: msg });
    });
    socket.on('username', function(username) {
        console.log(msg);

        messenger.emit('username', { id: socket.id, username: username });
    });

    socket.on('disconnect', () => {
        console.log('a user has disconnected');
    });
}); 