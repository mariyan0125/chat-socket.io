const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(socket){
  console.log('A user connected');
  
  socket.on('chat users', function(user){
    console.log('Users : ' + user);
    io.emit('chat users', user);
  });

  socket.on('chat message', function(msg){
    console.log('Message sent: ' + msg);
    io.emit('chat message', msg);
  });
 
  socket.on('hasLeft', function(user){
    console.log('Users : ' + user);
    io.emit('hasLeft', user);
  });


  

// socket.broadcast.emit to all except one (sender)
// socket.emit to one (sender)
// io.emit sends to everyone
  socket.on('disconnect', function(msg){
    console.log('A user disconnected');
  });

});//end of socket listeners

http.listen(process.env.PORT || 3000, function(){
  console.log('Waiting for visitors...');
});
