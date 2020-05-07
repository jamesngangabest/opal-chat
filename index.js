var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a customer connected');
});

http.listen(3000, () => {
  console.log('using port this *:3000');
});
io.on('connection', (socket) => {
  console.log('customer connected');
  socket.on('disconnect', () => {
    console.log('customer disconnected');
  });
});
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});
io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); 
io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});
