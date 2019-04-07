var net = require('net');
var mqtt = require('mqtt');

var payload = '';

var client  = mqtt.connect('mqtt://' + process.env.MQTT_SERVER);

client.on('connect', function () {
      client.publish(process.env.STATE_TOPIC, 'online');
});

net.createServer(function(sock) {
    
    console.log('Client connected: ' + sock.remoteAddress + ':' + sock.remotePort + '\n');

    sock.on('data', function(data) {
    	payload += data;
    });
    
    sock.on('close', function(data) {    	
		// MQTT publish
		// HACK: wifficounter send EOF as last character, remove it
        client.publish(process.env.TELE_TOPIC, payload.substring(0, payload.length-1));
    	console.log('Data received from ' + sock.remoteAddress + ':\n' + payload);
        console.log('Client disconnected: ' + sock.remoteAddress + ' ' + sock.remotePort + '\n');
        payload = '';
    });
    
}).listen(process.env.PORT);
