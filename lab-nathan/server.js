'use strict';

const morgan = require('morgan');
const debug = require('debug')('book:server');
const jsonParser = require('body-parser').json();
const express = require('express');
const createError = require('http-errors');
const Book = require('./model/Book.js');
const app = express();

app.use(morgan('dev'));

app.get('/', function(request, response) {
  debug('GET: /');
  response.send('Welcome to Nathan\'s Book API using Express.');
});

app.get('/api/book', function(request, response, next) {
  debug('GET: /api/book');
  Book.get(request.query.id)
    .then(book => response.json(book))
    .catch(error => next(error));
});

app.post('/api/book', jsonParser, function(request, response, next) {
  debug('POST: /api/book');

  if (Object.keys(request.body).length === 0) {
    return next(createError(400, 'Book not provided.'));
  }

  Book.create(request.body)
    .then(book => response.json(book))
    .catch(error => next(createError(400, error.message)));
});

app.delete('/api/book', function(request, response, next) {
  debug('DELETE: /api/book');
  Book.delete(request.query.id)
    .then(() => response.sendStatus(204))
    .catch(error => next(error));
});

app.use(function(error, request, response, next) {
  debug('error middleware');
  console.error(error);

  if (!next) {
    error = createError(404);
  }

  if (error.status) {
    return response.status(error.status).send(error.message);
  }

  error = createError(500, error.message);
  debug(error);
  response.status(error.status).send(error.name);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  debug(`Server started on port ${PORT}.`);
});