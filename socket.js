var net = require('net');
var j= require('jspack');
var x = ("<HHL","[8, 116]","szopa666").pack

console.log("x: " + JSON.stringify(x));

var client = new net.Socket();
client.connect(6488, '194.67.214.231', function() {
	console.log('Connected');
    client.write('Hello, server! Love, Client.');
    client.write(("<HHL","(8, 116)","szopa666").pack)
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});