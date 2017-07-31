'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('hike:hike');
const storage = require('../lib/storage.js');

const Hike = module.exports = function(name, distance, difficulty) {
  debug('hike constructor');

  if(!name) createError(400, 'expected name');
  if(!distance) createError(400, 'expected distance');
  if(!difficulty) createError(400, 'expected difficulty');

  this.id = uuidv4();
  this.name = name;
  this.distance = distance;
  this.difficulty = difficulty;
};

Hike.createHike = function(_hike){
  debug('createHike');

  try {
    let hike = new Hike(_hike.name, _hike.distance, _hike.difficulty);
    return storage.createItem('hike', hike);
  } catch (err){
    return Promise.reject(err);
  }
};

Hike.fetchHike = function(id) {
  debug('fetchHike');
  return storage.fetchItem('hike', id);
};

Hike.deleteHike = function(id){
  debug('deleteHike');
  return storage.deleteItem('hike', id)
}
