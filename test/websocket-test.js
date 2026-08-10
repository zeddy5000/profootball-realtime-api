const { io } = require('socket.io-client');

const socket = io(
  'http://localhost:3000/matches',
);

socket.on('connect', () => {
  console.log('Connected:', socket.id);

  socket.emit('subscribe_match', {
    matchId: 'test-match-123',
  });
});

socket.on('match_subscribed', (data) => {
  console.log('Subscribed:', data);

  socket.emit('test_broadcast', {
    matchId: 'test-match-123',
  });
});

socket.on('broadcast_sent', (data) => {
  console.log('Broadcast sent:', data);
});

socket.on('stats_update', (data) => {
  console.log('Stats update received:');
  console.log(
    JSON.stringify(data, null, 2),
  );
});

socket.on('error', (error) => {
  console.error(
    'WebSocket error:',
    error,
  );
});

socket.on('connect_error', (error) => {
  console.error(
    'Connection error:',
    error.message,
  );
});

socket.on('disconnect', (reason) => {
  console.log(
    'Disconnected:',
    reason,
  );
});