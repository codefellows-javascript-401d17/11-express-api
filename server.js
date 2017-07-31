'use strict';


const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('bake:server');
const Bake = require('./model/bake.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/test', function(req, res) {
  debug('GET: /test');

  res.json({ msg: 'hello from /test'});
});

app.post('/api/bake', jsonParser, function(req, res, next) {
  debug('POST: /api/bake');

  Bake.createBakedGood(req.body)
  .then( bake => res.json(bake))
  .catch( err => next(err));
  next();
});

app.get('/api/bake', function(req, res, next) {
  debug('GET: /api/bake');

  Bake.fetchBakedGood(req.query.id)
  .then( bake => res.json(bake))
  .catch( err => next(err));
});

app.use(function(err, req, res, next) {
  debug('error middleware');
  console.error(err.message);

  if (err.status) {
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});