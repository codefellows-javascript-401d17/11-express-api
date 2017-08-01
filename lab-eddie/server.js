'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jasonParser = require('body-parser').json();
const modelPaths = require('./lib/model-paths.js')
const debug = require('debug')('note:server')
const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));


for(let key in modelPaths.models) {
  modelPaths.allRoutes(key, app);
}


app.use(function(err, req, res, next) {
  debug('error stuff');
  console.error(err.message);

  if (err.status) {
    res.status(err.status).send(err.name);
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
});


app.listen(PORT, () => {
  debug(console.log('server on at port:', PORT));
});