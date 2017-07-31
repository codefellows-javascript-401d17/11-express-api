'use strict';

const
express = require('express'),
morgan = require('morgan'),
createError = require('http-errors'),
jsonParser = require('body-parser').json(),
debug = require('debug')('note:server'),
Car = require('./model/car.js'),

PORT = process.env.PORT || 3000,
app = express();

app.use(morgan('dev'));

app.get('/muvaland', function(req, res) {
  debug('GET: /muvaland');
  res.json({ msg: 'wah gwan from /muvaland'})
});

app.post('/api/car', jsonParser, function(req, res, next) {
  debug('POST: /api/car');

  Car.createCar(req.body)
  .then( car => res.json(car))
  .catch( err => next(err));
});

app.get('/api/car', function(req, res, next) {
  debug('GET: /api/car');

  Car.fetchCar(req.query.id)
  .then( car => res.json(car))
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
  debug(`server up: ${PORT}`);
});
