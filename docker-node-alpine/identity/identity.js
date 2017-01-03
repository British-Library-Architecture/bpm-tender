// Identity service - identity.js
'user strict'

const express = require('express');
const app = express.Router();

app.get('/', function(req, res) {
  res.send('Hello from APIv1 root route.');
});

app.get('/users', function(req, res) {
  res.send('List of APIv1 users.');
});

app.get('/users/:id', function(req, res) {
  var id = req.params.id;
  console.log('/users/:id - ' + id );

//  req.user = users[id];
  res.send('Details of APIv1 user:' + id);
});

app.get('/users/:id/:pw', function(req, res) {
  var id = req.params.id;
  var pw = req.params.pw;
  console.log('/users/:id - ' + id );
  console.log('/users/:pw - ' + pw );

//  req.user = users[id];
  res.send('Details of APIv1 user:' + id);
});


module.exports = app;
