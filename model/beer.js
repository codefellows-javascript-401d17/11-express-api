'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('beer:beer');
const storage = require('../lib/storage.js');

const Beer = module.exports = function(name, style, IBU) {
  debug('beer constructor');

  if (!name) return Promise.reject(createError(400, 'expected name'));
  if (!style) return Promise.reject(createError(400, 'expected style'));
  if (!IBU) return Promise.reject(createError(400, 'expected IBU'));

  this.id = uuidv4();
  this.name = name;
  this.style = style;
  this.IBU = IBU;
};

Beer.createBeer = function(_beer) {
  debug('createBeer');

  try {
    let beer = new Beer(_beer.name, _beer.style, _beer.IBU);
    return storage.createItem('beer', beer);
  } catch(err) {
    return Promise.reject(err);
  }
};

Beer.fetchBeer = function(id) {
  debug('fetchBeer');
  return(storage.fetchItem('beer', id));
};

Beer.deleteBeer = function(id) {
  debug('deleteBeer');
  return(storage.deleteItem('beer', id));
};
