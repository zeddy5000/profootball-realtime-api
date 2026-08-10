const { io } = require('socket.io-client');

const socket = io(
  'http://localhost:3000/matches',
);

socket.on('connect', () => {
  console.log('Client B connected:', socket.id);

  socket.emit('subscribe_match', {
    matchId: 'match-B',
  });
});

socket.on('match_subscribed', (data) => {
  console.log('Client B subscribed:', data);
});

socket.on('stats_update', (data) => {
  console.log(
    'CLIENT B RECEIVED UPDATE:',
    JSON.stringify(data, null, 2),
  );
});

socket.on('error', (error) => {
  console.error('Client B error:', error);
});