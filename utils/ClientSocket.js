
require('../../common/socket.io.js')

function clientSocket(data){
	var socket = io('http://localhost:9001');
	socket.emit('update',{'aaa'})
}
