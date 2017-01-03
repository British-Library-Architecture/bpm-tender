// Identity service - identity.js
'user strict'

const REDISHOST = 'redis://redis1';

const express   = require('express');
const app       = express.Router();

const redis     = require('redis');
const client    = redis.createClient(REDISHOST);

// Any Redis uncaptured errors then log
client.on("error", function (err) {
    console.log("REDIS error (identity.js): " + err);
});


/**
 * Check the service is working
 */
app.get('/', function(req, res) {
  res.send('OK');
});


/**
 * identity/<identity>
 * Check the existance of an identity
 * Return
 *   Found:      HTTP 200 + JSON '{ "identity" : "<identity>", "status" : "OK" }'
 *   Not found:  HTTP 404 + JSON '{ "identity" : "<identity>", "status" : "ERROR", "error" : "Identity not found" }'
 */
app.get('/:id', function(req, res) {
  var id = req.params.id;
  console.log('/:id - ' + id );

// FIXME - just create a dummy identity/secret entry (oh, and I'm not encrypting the secret either LOLZ!)
  client.set("gwicks", "secret1234");

// Check if the identity exists
  client.exists(id, function (err, value){
    if (err) throw(err)

    if (value === 0) {
      console.log('Identity ' + id + ' not found');
      res.status(404).json({ identity: id, status: "ERROR", error: "Identity does not exist" });
    } else {
      console.log('Identity ' + id + ' found');
      res.json({ identity: id, status: "OK" });
    }
  })
});


/**
 * identity/<identity>/<secret>
 * Check validity of identity/secret
 * Return
 *   Valid   HTTP 200 + JSON '{ "identity" : "<identity>", "status" : "OK" }'
 *   Invalid HTTP 404 + JSON '{ "identity" : "<identity>", "status" : "error", "error" : "Identity credentials invalid" }'
 */
app.get('/:id/:pw', function(req, res) {
  var id = req.params.id;
  var pw = req.params.pw;
  console.log('/:id/:pw - id=' + id + ' pw=' + pw);

// Check if the username exists
  client.get(id, function (err, value){
    if (err) throw(err)

    if (value === null) {
      console.log('Identity ' + id + ' not found');
      res.status(404).json({ identity: id, status: "ERROR", error: "Identity does not exist" });
    } else if (pw === value) {
      console.log('Identity ' + id + ' found');
      res.json({ identity: id, status: "OK" });
    } else {
      console.log('Identity ' + id + ' found');
      res.status(404).json({ identity: id, status: "ERROR", error: "Identity credentials invalid" });
    }
  })
});


module.exports = app;
