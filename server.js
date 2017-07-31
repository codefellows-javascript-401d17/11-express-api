'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('beer:server');
const Beer = require('./model/beer.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/test', function(req, res) {
  debug('GET: /test');
  res.json({msg: 'you have tested a GET req'});
});

app.post('/api/beer', jsonParser, function (req, res, next) {
  debug('POST: /apo/beer');

  Beer.createBeer(req.body)
  .then( beer => res.json(beer))
  .catch( err => next(err));
});

app.get('/api/beer', function(req, res, next) {
  debug('GET: /api/beer');
  Beer.fetchBeer(req.query.id)
  .then( beer => res.json(beer))
  .catch( err => next(err));
});

app.delete('/api/beer', function(req, res, next) {
  debug('DELETE: /api/beet');
  Beer.deleteBeer(req.query.id)
  .then( () => res.send('Deleted beer'))
  .catch( err => next(err));
});



app.listen(PORT, () => {
  debug('server up:', PORT);
});
