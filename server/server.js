const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  transports: ['websocket'],
});

const movePieceFactory = require('./handlers/movePieceFactory');
const leaveGameOrDisconnectFactory = require('./handlers/leaveGameOrDisconnectFactory');
const createGameFactory = require('./handlers/createGameFactory');
const joinGameFactory = require('./handlers/joinGameFactory');

const sendGames = require('./helpers/sendGames');

io.on('connection', (socket) => {
  sendGames(socket);

  socket.on(
    'disconnect', leaveGameOrDisconnectFactory({ io, socket })
  );

  socket.on('move-piece', movePieceFactory({ io, socket }));

  socket.on('leave-game', leaveGameOrDisconnectFactory({ socket, io }));

  socket.on(
    'create-game',
    createGameFactory({ io, socket })
  );

  socket.on('join-game', joinGameFactory({ io, socket }));
});

http.listen(4000, () => {
  console.log('listening on *:4000');
});
