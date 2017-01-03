// index.js
'use strict';

//const PORT = 8080;
const PORT = process.env.npm_package_config_port;

console.log('Starting application');

// 
const express = require('express');
const app = module.exports = express();


// Register the services
app.use('/api/v1/identity', require('./identity'));
app.use('/api/v1/catalogue', require('./catalogue'));


// Start the listener
app.listen(PORT);
console.log('Express started on port ' + PORT);

// EOF
