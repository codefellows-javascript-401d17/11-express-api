'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('hike:server');
// const Hike = require('./model/hike.js');

const PORT = process.env.PORT || 3000
const app = express();

app.use(morgan('dev'));

app.listen(PORT, () => {
  debug('server up:', PORT);
});
