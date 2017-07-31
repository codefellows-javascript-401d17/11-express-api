'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('pokemon:server');
const Pokemon = require('./model/pokemon.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.get('/test', function(req, res) {
  debug('GET: /test');
  res.json({msg: 'hello from the land of /test'});
});

app.post('/api/pokemon', jsonParser, function(req, res, next) {
  debug('POST: /api/pokemon');

  Pokemon.createPokemon(req.body)n
  .then((pokemon) => res.json(pokemon))
  .catch((err) => next(err));
});

app.get('/api/pokemon', function(req, res, next) {
  debug('GET: /api/pokemon');

  Pokemon.fetchPokemon(req.query.id)
  .then((pokemon) => res.json(pokemon))
  .catch((err) => next(err));
});

app.use(function(err, req, res, next) {
  debug('error middleware');
  console.error(err.message);

  if(err.status) {
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});

app.listen(PORT, () => {
  debug('server up:', PORT);
});

