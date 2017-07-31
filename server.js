'use strict';
const express = require('express');
const Drink = require('./model/drink.js');
const jsonParser = require('body-parser').json();
const PORT = process.env.PORT || 3000;
const app = express();

app.get('/test', function(req, rsp) {
  
})

app.post('/drinks', jsonParser, function(req, rsp, next) {
  rsp.json(req.body);
});

app.put('/drinks/:id', jsonParser, function(req, rsp, next) {
  rsp.json(req.body);
});

app.listen(PORT, function(req, rsp) {
  console.log('listening on port', PORT);
})