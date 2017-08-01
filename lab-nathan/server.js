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
  response.json({ message: 'Welcome to Nathan\'s Book REST API' });
});

app.get('/api/book', function(request, response, next) {
  debug('GET: /api/book');
  Book.get(request.query.id)
    .then(book => response.json(book))
    .catch(error => next(error));
});

app.post('/api/book', jsonParser, function(request, response, next) {
  debug('POST: /api/book');
  Book.create(request.body)
    .then(book => response.json(book))
    .catch(error => next(error));
});

app.delete('/api/book', function(request, response, next) {
  debug('DELETE: /api/book');
  Book.delete(request.query.id)
    .then(() => response.sendStatus(204))
    .catch(error => next(error));
});

app.use(function(error, request, response) {
  debug('error middleware');
  console.error(error);

  if (error.status) {
    response.status(error.status).send(error.name);
    return;
  }

  error = createError(500, error.message);
  response.status(error.status).send(error.name);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}.`);
});