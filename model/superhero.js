'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('superhero:superhero');
const storage = require('../lib/storage.js');

const Superhero = module.exports = function(name, comicUni) {
  debug('superhero constructor');

  if (!name) throw createError(400, 'bad request');
  if (!comicUni) throw createError(400, 'bad request');
  this.id = uuidv4();
  this.name = name;
  this.comicUni = comicUni;
};

Superhero.createSuperhero = function(_superhero) {
  debug('createSuperhero');

  try {
    let superhero = new Superhero(_superhero.name, _superhero.comicUni);
    return storage.createItem('superhero', superhero);
  } catch (err) {
    return Promise.reject(err);
  }
};

Superhero.fetchSuperhero = function(id) {
  debug('fetchSuperhero');
  return storage.fetchItem('superhero', id);
};

Superhero.deleteSuperhero = function(id) {
  debug('deleteSuperhero');
  return storage.deleteItem('superhero', id);
};
