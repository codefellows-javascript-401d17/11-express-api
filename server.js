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

app.post('/api/beer', jsonParser, function (req, res, next) {
  debug('POST: /api/beer');

  Beer.createBeer(req.body)
  .then( beer => res.status(200).json(beer))
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
  .then( () => res.status(204).send('Beer Deleted'))
  .catch( err => next(err));
});

app.use(function(err, req, res, next){
  debug('error middleware');
  console.error(err.message);

  if(err.status){
    res.status(err.status).send(err.name);
    return;
  }

  if(res.status(404)){
    res.status(404).send('Not Found');
    return;
  }

  if(err.status(400)){
    res.status(400).send('Bad Request');
    return;
  }



  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});



app.listen(PORT, () => {
  debug('server up:', PORT);
});
