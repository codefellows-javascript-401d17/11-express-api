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

app.listen(PORT, () => {
  debug(console.log('server on at port:', PORT));
});