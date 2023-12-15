// code for setting up mulitplyer server is from https://gamedevacademy.org/create-a-basic-multiplayer-game-in-phaser-3-with-socket-io-part-1/#Setting_up_the_server
var express = require('express');
var app = express(); // express lets us serve files to clients. create new instance of express
var server = require('http').Server(app); // app will act as an http server

// code for this line is from https://stackoverflow.com/questions/64923775/typeerror-require-listen-is-not-a-function
var io = require('socket.io')(server);

var players = {}; // all players in the game right now

app.use(express.static(__dirname)); // use the directory as the main folder
console.log("dir name = " + __dirname); 
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/chatroom/html/index2.html'); // set layout.html to be the root 
});

app.get('/game', function (req, res) {
    res.sendFile(__dirname + '/chatroom/index2.html'); // set index.html to be the root 
});
// have the socket.io listen to connections


io.on('connection', function (socket) {
    // create a new player and add it to our players object
    players[socket.id] = {
        rotation: 0,
        x: Math.floor(Math.random() * 550) + 250,
        y: Math.floor(Math.random() * 450) + 50,
       
        playerId: socket.id,
        team: (Math.floor(Math.random() * 2) == 0) ? 'red' : 'blue',
        wearing: [],
        username: null,
        owns: []
        
    };
    // send the players object to the new player
    socket.emit('currentPlayers', players, players[socket.id]); // socket.emit only emits to the client (just the new player)
    // update all other players of the new player
    socket.broadcast.emit('newPlayer', players[socket.id]); // socket.broadcast.emit sends it to all players

    // have the socket.io listen to disconnections
    socket.on('disconnect', function () {
        console.log('user disconnected');
        // remove this player from our players object
        delete players[socket.id];

        // emit a message to all players to remove this player
        // disconnect socket:https://www.dynetisgames.com/2017/03/06/how-to-make-a-multiplayer-online-game-with-phaser-socket-io-and-node-js/ 
        io.emit('remove', socket.id);
    });

    // when a player moves, update the player data
    socket.on('playerMovement', function (movementData) {
        // update the data stored on the server for the player
        players[socket.id].x = movementData.x;
        players[socket.id].y = movementData.y;
        players[socket.id].xSpeed = movementData.xSpeed;
        // emit a message to all players about the player that moved
        socket.broadcast.emit('playerMoved', players[socket.id]);
        
    });

    // update the server data for this player for their username and their wearing array
    socket.on('updatePlayerUsernameAndWearing', function (username, wearing, owns){
        players[socket.id].username = username;
        players[socket.id].wearing = wearing;
        players[socket.id].owns = owns;
        socket.emit('updateSelf', players[socket.id], players); // tell client to update the current player
    });

    // after current user is updated, send message to everyone else to update their version of that player
    socket.on('selfFinishedUpdating', function(){
        io.emit('updatePlayer', players[socket.id]);
    });

    // when a player submits a chat, update it for everyone
    socket.on('newChat', function (text, user) {
        // emit a message to all players about the chat
        console.log("chat = " + text);
        io.emit('showNewChat', text, user);
    });

    });



// Make server listen on port 8081
server.listen(8081, function () {
    console.log(`Listening on ${server.address().port}`);
});