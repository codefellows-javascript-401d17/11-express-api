'use strict';

const
uuidv4 = require('uuid/v4'),
createError = require('http-errors'),
debug = require('debug')('note:car'),
 storage = require('../lib/storage.js');

const Car = module.exports = function(make, model, year) {
  debug('note contructor');

  if (!make) throw new Error('expected make');
  if (!model) throw new Error('expected model');
  if (!year) throw new Error('expected year');

  this.id = uuidv4()
  this.make = make;
  this.mode = model;
  this.year = year;
};

Car.createCar = function(_car) {
  debug('createCar');

  try {
    let car = new Car(_car.make, _car.model, _car.year);
    return storage.createItem('car', car);
  } catch (err) {
    return Promise.reject(err);
  }
};

Car.fetchCar = function(id) {
  debug('fetchCar');
  return storage.fetchItem('note', id);
}
