'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:server');
const Note = require('./model/note.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));

app.get('/test', (req, res, next) => {
  debug('GET: /test');
  res.json({msg: 'testing GET route success'});
  next();
});

app.post('/api/note', jsonParser, (req, res, next) => {
  debug('POST: /api/note');
  if(!req.name || !req.content){
    next();
  }
  Note.createNote(req.body)
  .then((note) => res.json(note))
  .catch((err) => next(err));
});

app.get('/api/note', (req, res, next) => {
  debug('GET: /api/note');
  Note.fetchNote(req.query.id)
  .then((note) => res.json(note))
  .catch((err) => next(err));
});

app.put('/api/note', jsonParser,  (req, res, next) => {
  debug('PUT: /api/note');
  console.log(req.query);
  Note.replaceNote(req.query)
  .then((note) => res.json(note))
  .catch((err) => next(err));
});

app.delete('/api/note', (req, res, next) => {
  debug('DELETE: /api/note');
  Note.deleteNote(req.query.id)
  .then((note) => res.json(note))
  .catch((err) => next(err));
});

// app.use('/*', (req, res) => {
//   debug('bad route middleware');
//   console.log('yes');
//   return res.status(404);
// });

app.use((err, req, res, next) => {
  debug('error middleware');
  console.error(err.message);
  if(err.status) return res.status(err.status).send(err.name);
  err = createError(404, err.message);
  res.status(err.status).send(err.name);
  next();
});

app.listen(PORT, () => debug('server running on PORT:', PORT));
