'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('pokemon:pokemon');
const storage = require('../lib/storage.js');

const Pokemon = module.exports = function(name, type, gen) {
  if(!name)throw new Error('expect Pokemon name');
  if(!type)throw new Error('expected Pokemon type');
  if(!gen)throw new Error('expected a generation');

  this.id = uuidv4();
  this.name = name;
  this.type = type;
  this.gen = gen;
};

Pokemon.createPokemon = function(_pokemon) {
  debug('createPokemon');

  try {
    let pokemon = new Pokemon(_pokemon.name, _pokemon.type, _pokemon.gen);
    return storage.createItem('pokemon', pokemon);
  } catch(err) {
    return Promise.reject(err);
  }
};

Pokemon.fetchPokemon = function(id) {
  debug('fetchPokemon');
  return storage.fetchItem('pokemon', id);
};

Pokemon.deletePokemon = function(id) {
  debug('deletePokemon');
  return storage.deleteItem('pokemon', id);
};