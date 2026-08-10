const { io } = require('socket.io-client');

const socket = io(
  'http://localhost:3000/matches',
);

socket.on('connect', () => {
  console.log('Client A connected:', socket.id);

  socket.emit('subscribe_match', {
    matchId: 'match-A',
  });
});

socket.on('match_subscribed', (data) => {
  console.log('Client A subscribed:', data);

  setTimeout(() => {
    socket.emit('test_broadcast', {
      matchId: 'match-A',
    });
  }, 1000);
});

socket.on('stats_update', (data) => {
  console.log(
    'CLIENT A RECEIVED UPDATE:',
    JSON.stringify(data, null, 2),
  );
});

socket.on('error', (error) => {
  console.error('Client A error:', error);
});