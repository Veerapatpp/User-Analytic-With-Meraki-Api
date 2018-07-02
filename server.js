// nodejs Meraki Presence receiver by Kris Linquist (klinquis@cisco.com)
//
// Prerequisite: the express node module. Use 'sudo npm install express' to install, then start this script with 'nodejs merakiReceiver.js' (sudo required if port <1024)
//
// Meraki will send a HTTP GET request to test the URL and expect to see the validator as a response.
// When it sends the presence information, it will also send the secret. This script validates that the secret is correct prior to parsing the data.
//
// This script listens for the uri {request_uri}:port/meraki
//
var date = new Date();
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
// var monthIndex = date.getMonth();
// var year = date.getFullYear();
var firebase = require("firebase")
var listenport = 9201; //TCP listening port
var secret = "1234";	//Secret that you chose in the Meraki dashboard
var validator = "54b9771bb5b1cfb681332f7a471b7e96a94ee7ce";	//Validator string that is shown in the Meraki dashboard
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var server = require('http').Server(app)
var config = {
    apiKey: "AIzaSyDCqXeu8zhsOg5dpfnXlhhSuq1HIwJXKBo",
    authDomain: "api-meraki.firebaseapp.com",
    databaseURL: "https://api-meraki.firebaseio.com",
    projectId: "api-meraki",
    storageBucket: "api-meraki.appspot.com",
    messagingSenderId: "565759946192"
  };
  firebase.initializeApp(config)
  var test = firebase.database().ref('Api-meraki')
  var result
app.use(jsonParser)
app.use(function (req, res, next) {
res.header('Access-Control-Allow-Origin', '*')
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
next()
})
var jsoned = {} ;
app.get('/meraki', function(req, res){
res.send(validator);
console.log("sending validation")
});


// var cars = {apMac: '0c:8d:db:c4:4a:1d',
//             apFloors: [],
//             apTags: [],
//             observations: 
//             [ { location: [Object],
//                      seenTime: '2018-06-29T07:43:54Z',
//                      clientMac: 'c8:78:19:0c:c7:8d',
//                      seenEpoch: 1530258234,
//                      rssi: -85 },
//               { location: [Object],
//                      seenTime: '2018-06-29T07:43:54Z',
//                      clientMac: 'fc:c4:a9:c9:c:39',
//                      seenEpoch: 1530258234,
//                      rssi: -77 }]
//             };

// jsoned = cars;
// console.log(jsoned)
// var i = 0,text={};
// let ob = jsoned.observations
//  for (i in ob)
//   {
//     text = ob[i].clientMac;
//     firebase.database().ref('hofs/' + text).update({xx: text})
//     console.log(text)
// }

//
app.get('/test', function(req, res){
    res.send(jsoned);
    // console.log("sending validation")
    });

app.post('/meraki', function(req, res){
    console.log(req.body)

try {
jsoned = req.body.data;
console.log(jsoned)
var i = 0,text={};
let ob = jsoned.observations
 for (i in ob)
  {

    text = ob[i].clientMac;
    // if(ob[i].clientMac)
    // {


    // }
    firebase.database().ref('hofs/Clientmac/' +day+'/'+monthIndex+'/'+year+'/'+ text).update({xx: text})
    //status can change in table
    console.log(text)
 
}
// { ipv4: '/192.168.1.217',
// 2018-06-29T10:26:28.044000+00:00 app[web.1]:        location: [Object],
// 2018-06-29T10:26:28.044002+00:00 app[web.1]:        seenTime: '2018-06-29T10:26:27Z',
// 2018-06-29T10:26:28.044003+00:00 app[web.1]:        ssid: 'cafe@playtorium',
// 2018-06-29T10:26:28.044005+00:00 app[web.1]:        os: 'Mac OS X',
// 2018-06-29T10:26:28.044006+00:00 app[web.1]:        clientMac: '1c:36:bb:2b:de:3c',
// 2018-06-29T10:26:28.044008+00:00 app[web.1]:        seenEpoch: 1530267987,
// 2018-06-29T10:26:28.044009+00:00 app[web.1]:        rssi: 47,
// 2018-06-29T10:26:28.044011+00:00 app[web.1]:        ipv6: null,
// 2018-06-29T10:26:28.044012+00:00 app[web.1]:        manufacturer: 'Apple' },
// 2018-06-29T10:26:28.044014+00:00 app[web.1]:      { ipv4: null,
// 2018-06-29T10:26:28.044015+00:00 app[web.1]:        location: [Object],
// 2018-06-29T10:26:28.044016+00:00 app[web.1]:        seenTime: '2018-06-29T10:25:59Z',
// 2018-06-29T10:26:28.044018+00:00 app[web.1]:        ssid: null,
// 2018-06-29T10:26:28.044019+00:00 app[web.1]:        os: null,
// 2018-06-29T10:26:28.044021+00:00 app[web.1]:        clientMac: '04:d6:aa:b3:0b:da',
// 2018-06-29T10:26:28.044022+00:00 app[web.1]:        seenEpoch: 1530267959,
// 2018-06-29T10:26:28.044024+00:00 app[web.1]:        rssi: 23,
// 2018-06-29T10:26:28.044025+00:00 app[web.1]:        ipv6: null,
// 2018-06-29T10:26:28.044027+00:00 app[web.1]:        manufacturer: 'Samsung(THAILAND)' },




//firebase.database().ref('hofs/mac').update(jsoned)


// result = test.push(jsoned)
//console.log("secret"+jsoned.secret)
// if (jsoned.secret == secret) {
// for (i=0; i<jsoned.probing.length; i++) {
// console.log("client " + jsoned.probing[i].client_mac + " seen on ap " + jsoned.probing[i].ap_mac + " with rssi " + jsoned.probing[i].rssi + " at " + jsoned.probing[i].last_seen);
// }
// } else {
// console.log("invalid secret from " + req.connection.remoteAddress);
// }
res.end()
} catch (e) {
// An error has occured, handle it, by e.g. logging it
console.log("Error. Likely caused by an invalid POST from " + req.connection.remoteAddress + ":");
console.log(e);
res.end();
}

});

app.set('port', (process.env.PORT || listenport))
server.listen(app.get('port'), function () {
console.log("Meraki presence API receiver listening on port " + this.address().port, app.settings.env)
})

