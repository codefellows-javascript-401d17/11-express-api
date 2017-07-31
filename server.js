'use strict';
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.listen(function(req, rsp) {
  console.log('listening on port', PORT);
})