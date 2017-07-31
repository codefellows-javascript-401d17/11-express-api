'use strict';
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const Drink = require('./model/drink.js');

app.listen(function(req, rsp) {
  console.log('listening on port', PORT);
})