// Identity service - identity.js
'user strict';

const REDISHOST = 'redis://redis1';
const redis     = require('redis');
const client    = redis.createClient(REDISHOST);

const express   = require('express');
const app       = express.Router();

const SHATYPE   = 'sha256';
const sha_js    = require('sha.js');


// Any Redis uncaptured errors then log
client.on('error', function (err) {
  console.log('REDIS error (identity.js): %s ', err);
});

client.on('connect', function() {
  console.log('REDIS server connected');
});


/**
 * Check the service is working
 */
app.get('/', function(req, res) {
  res.json({ service: 'identity', status: 'OK' });
});


/**
 * GET identity/<identity>
 * Check the existance of an identity
 * Return
 *   Found:      HTTP 200 + JSON '{ "identity" : "<identity>", "status" : "OK" }'
 *   Not found:  HTTP 404 + JSON '{ "identity" : "<identity>", "status" : "ERROR", "error" : "Identity not found" }'
 */
app.get('/:id', function(req, res) {
  const id = req.params.id;
  console.log('GET /:id - ' + id );

  // Check if the identity exists
  client.get(id, function (err, value){
    if (err) throw(err);

    if (value === null) {
      console.log('Identity %s not found', id);
      res.status(404).json({ identity: id, status: 'ERROR', error: 'Identity does not exist' });
    } else {
      console.log('Identity %s found', id);
      console.log('pw_hash %s', value);
      res.json({ identity: id, status: 'OK' });
    }
  });
});


/**
 * GET identity/<identity>/<secret>
 * Check validity of identity/secret
 * Return
 *   Valid   HTTP 200 + JSON '{ "identity" : "<identity>", "status" : "OK" }'
 *   Invalid HTTP 404 + JSON '{ "identity" : "<identity>", "status" : "error", "error" : "Identity credentials invalid" }'
 */
app.get('/:id/:pw', function(req, res) {
  const id      = req.params.id;
  const pw      = req.params.pw;
  const sha256  = sha_js(SHATYPE);
  const pw_hash = sha256.update(pw, 'utf8').digest('hex');

  console.log('GET /:id/:pw - id=%s pw=%s pw_hash=%s', id, pw, pw_hash);

  // Check if the username exists
  client.get(id, function (err, value){
    if (err) throw(err);

    if (value === null) {
      console.log('Identity %s not found', id);
      res.status(404).json({ identity: id, status: 'ERROR', error: 'Identity does not exist' });
    } else if (pw_hash === value) {
      console.log('Identity %s found', id);
      res.json({ identity: id, status: 'OK' });
    } else {
      console.log('Identity %s invalid', id);
      res.status(404).json({ identity: id, status: 'ERROR', error: 'Identity credentials invalid' });
    }
  });
});


/**
 * POST identity/<identity>/<secret>
 * Create a new identity/secret
 * Return
 *   Created HTTP 201 + JSON + '{ "identity" : "<identity>", "status" : "OK" }'
 */
app.post('/:id/:pw', function(req, res) {
  const id      = req.params.id;
  const pw      = req.params.pw;
  const sha256  = sha_js(SHATYPE);
  const pw_hash = sha256.update(pw, 'utf8').digest('hex');

  console.log('POST /:id/:pw - id=%s pw=%s pw_hash=%s', id, pw, pw_hash);

  client.set(id, pw_hash, function (err){
    if (err) throw(err);
  });

  res.status(201).json({ identity: id, status: 'OK' });
});

// Add the app to the main routing
module.exports = app;
