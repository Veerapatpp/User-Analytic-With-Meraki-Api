// nodejs Meraki Presence receiver by Kris Linquist (klinquis@cisco.com)
//
// Prerequisite: the express node module.  Use 'sudo npm install express' to install, then start this script with 'nodejs merakiReceiver.js' (sudo required if port <1024)
//
// Meraki will send a HTTP GET request to test the URL and expect to see the validator as a response.
// When it sends the presence information, it will also send the secret.  This script validates that the secret is correct prior to parsing the data.
//
// This script listens for the uri {request_uri}:port/meraki
//
var listenport = 9201;   										//TCP listening port
var secret = "1234";											//Secret that you chose in the Meraki dashboard
var validator = "54b9771bb5b1cfb681332f7a471b7e96a94ee7ce";		//Validator string that is shown in the Meraki dashboard
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var server = require('http').Server(app)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/meraki', function(req, res){
  res.send(validator);
  console.log("sending validation")
});


app.post('/meraki', function(req, res){
  console.log(req.body.data);
	try {
	  var jsoned = JSON.parse(req.body.data);
	  if (jsoned.secret == secret) {
		  for (i=0; i<jsoned.probing.length; i++) {
			  console.log("client " + jsoned.probing[i].client_mac + " seen on ap " + jsoned.probing[i].ap_mac + " with rssi " + jsoned.probing[i].rssi + " at " + jsoned.probing[i].last_seen);
		  }
	   } else {
		   console.log("invalid secret from  " + req.connection.remoteAddress);
	   }
	} catch (e) {
		// An error has occured, handle it, by e.g. logging it
  	console.log("Error.  Likely caused by an invalid POST from " + req.connection.remoteAddress + ":");
  	console.log(e);
  	res.end();
  }

});

app.set('port', (process.env.PORT || listenport))
server.listen(app.get('port'), function () {
  console.log("Meraki presence API receiver listening on port " + this.address().port, app.settings.env)
})