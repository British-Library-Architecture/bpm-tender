// Catalog service - catalogue.js
'use strict';

const express = require('express');
var app = express.Router();

app.get('/', function(req, res) {
  res.send('Hello from APIv1 catalogue route.');
});

app.get('/search', function(req, res) {
  res.send('Search.');
});

module.exports = app;
