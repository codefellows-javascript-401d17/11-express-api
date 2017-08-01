'use strict';
const express = require('express');
const Drink = require('./model/drink.js');
const jsonParser = require('body-parser').json();
const PORT = process.env.PORT || 3000;
const app = express();
const debug = require('debug')('drink:server');
const storage = require('./lib/storage.js');
const createError = require('http-errors');


app.get('/api/drink', function (req, rsp, next) {
  debug('GET: /api/drink');
  Drink.fetchDrink(req.query.id)
    .then((drink) => {
      rsp.json(drink);
    })
    .catch((err) => {
      next(err);
    });
});

app.post('/api/drink', jsonParser, function (req, rsp, next) {
  debug('POST: /drink');
  if (!Object.keys(req.body).includes('name', 'isAlcoholic', 'flavor')) {
    next(createError(400, 'bad request'));
    return;
  }


  Drink.createDrink(req.body)
    .then((drink) => {
      rsp.json(drink);
    })
    .catch((err) => {
      next(err);
    });
});

app.delete('/api/drink', jsonParser, function (req, rsp, next) {
  debug('PUT: /api/drink');
  Drink.deleteDrink(req.query.id)
    .then(() => {
      rsp.status(204);
    })
    .catch((err) => {
      next(err);
    });
});

app.use(function (err, req, rsp, next) {
  debug('error middleware');
  debug('ERROR STATUS', err.status);
  rsp.status(err.status).send(err.message);
  return;
});

app.listen(PORT, function (req, rsp) {
  debug('listening on port', PORT);
});