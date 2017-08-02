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

app.get('/api/pokemon', function(req, res, next) {
  debug('GET: /api/pokemon');

  Pokemon.fetchPokemon(req.query.id)
  .then( pokemon => res.json(pokemon))
  .catch( err => next(err));
});

app.post('/api/pokemon', jsonParser, function(req, res, next) {
  debug('POST: /api/pokemon');

  Pokemon.createPokemon(req.body)
  .then( pokemon => res.json(pokemon) )
  .catch( err => next(err) );
});

app.delete('/api/pokemon', function(req, res, next) {
  debug('DELETE: /api/pokemon');

  Pokemon.deletePokemon(req.query.id)
  .then( () => createError(204, 'pokemon deleted') )
  .catch( err => next(err) );
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