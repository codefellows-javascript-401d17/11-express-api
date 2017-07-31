'use strict';

const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('pokemon:server');
const Pokemon = require('./model/pokemon.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.listen(PORT, function() {
  debug('server up: ', PORT);
});