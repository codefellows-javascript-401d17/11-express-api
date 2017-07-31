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

app.get('/test', function(req, res){
  debug('GET: /test');
  res.json({msg: 'you have tested a GET req'});
})



app.listen(PORT, () => {
  debug('server up:', PORT);
});
