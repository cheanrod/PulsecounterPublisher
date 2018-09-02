var net = require('net')
var mqtt = require('mqtt')

var payload = ''

var client  = mqtt.connect('mqtt://' + process.env.MQTT_SERVER)

client.on('connect', function () {
      //client.publish('pulsecounter/state', 'online')
})

net.createServer(function(sock) {
    
    console.log('Client connected: ' + sock.remoteAddress + ':' + sock.remotePort + '\n')

    sock.on('data', function(data) {
    	payload += data
    })
    
    sock.on('close', function(data) {
    	// parse JSON
    	try {
    		var json = JSON.parse(payload);
    	} catch (e) {
    		console.log('Received invalid json')
    		return
    	}
    	
    	// Build state object based on modultyp and system info
    	var modultyp = { "modultyp": json.modultyp }
    	var sysinfo = json.Systeminfo
    	var state = Object.assign(modultyp, sysinfo)
    	
        // MQTT publish
        client.publish('pulsecounter/state', JSON.stringify(state))
        for (var i = 0; i < json.vars.length; i++) {
        	client.publish('pulsecounter/tele', JSON.stringify(json.vars[i]))
    	}
    	console.log('Data received from ' + sock.remoteAddress + ':\n' + payload) 
        console.log('Client disconnected: ' + sock.remoteAddress + ' ' + sock.remotePort + '\n')
        payload = ''
    })
    
}).listen(8181)
