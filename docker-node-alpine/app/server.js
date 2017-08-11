// index.js
'use strict';

//const PORT = 8080;
const PORT    = process.env.npm_package_config_port || 8080;
const express = require('express');
const app     = module.exports = express();

global.HTTPStatus = require('http-status-codes');
global.eyes       = require('eyes').inspector({ maxLength: 1024*32 });

//
console.log('Starting service endpoints');

// Register the services
app.use('/api/v1/identity', require('./identity'));
app.use('/api/v1/catalogue', require('./catalogue'));


// Start the listener
app.listen(PORT);
console.log('Express started on port ' + PORT);

// EOF
