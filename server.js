'use strict';
const express = require('express');
const Drink = require('./model/drink.js');
const jsonParser = require('body-parser').json();
const PORT = process.env.PORT || 3000;
const app = express();
const debug = require('debug')('drink:server');

app.get('/test', function (req, rsp) {
  debug('GET: /test');
});

app.post('/drinks', jsonParser, function (req, rsp, next) {
  debug('POST: /drinks');
  rsp.json(req.body);
});

app.put('/drinks/:id', jsonParser, function (req, rsp, next) {
  debug('PUT: /drinks/:id');
  rsp.json(req.body);
});

app.listen(PORT, function (req, rsp) {
  debug('listening on port', PORT);
});