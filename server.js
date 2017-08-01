'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('superhero:server');
const Superhero = require('./model/superhero.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/test', function(req, res) {
  debug('GET: /test');
  res.json({msg: 'hello from /test land'});
});

app.post('/api/superhero', jsonParser, function(req, res, next) {
  debug('POST: /api/superhero');

  Superhero.createSuperhero(req.body)
  .then( superhero =>  {
    res.json(superhero);
  })

  .catch( err =>  {
    next(err);
  });
});

app.get('/api/superhero', function(req, res, next) {
  debug('GET: /api/superhero');

  Superhero.fetchSuperhero(req.query.id)
  .then( superhero => res.json(superhero))
  .catch( err => next(err));
});

app.delete('/api/superhero', function(req, res, next) {
  debug('DELETE: /api/superhero');

  Superhero.deleteSuperhero(req.query.id)
  .then( superhero => res.json(superhero))
  .catch( err => next(err));
});

app.use(function(err, req, res, next) {
  debug('error middleware');


  if (err.status) {
    res.status(err.status).send(err.message);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  debug('server up:', PORT);
});
