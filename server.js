'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('hike:server');
const Hike = require('./model/hike.js');

const PORT = process.env.PORT || 3000
const app = express();

app.use(morgan('dev'));

app.get('/test', function(req, res) {
  debug('GET: /test');
  res.json({ msg: 'hello from /test land'});
});

app.post('/api/hike', jsonParser, function(req, res, next){
  debug('POST: /api/hike');

  Hike.createHike(req.body)
  .then( hike => res.json(hike))
  .catch( err => next(err));
});

app.get('/api/hike', function(req, res, next){
  debug('GET: /api/hike');

  Hike.fetchHike(req.query.id)
  .then( hike => res.json(hike))
  .catch( err => next(err));
});

app.delete('/api/hike', function(req, res, next){
  debug('DELETE: /api/hike');

  Hike.deleteHike(req.query.id)
  .then( hike => res.json(hike))
  .catch( err => next(err));
});

app.use(function(err, req, res, next){
  debug('error middleware');
  console.error(err.message);

  if(err.status){
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  debug('server up:', PORT);
});
