var http = require('http');
var app = http.createServer();
var io = require('socket.io')(app);

app.listen(9001);


io.on('connection',function(socket){
	socket.on('update',function(data){
		socket.broadcast.emit('news',{data:data})
	})
})
