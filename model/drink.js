const uuid = require('uuid/v4');
const debug = require('debug')('drink.js');
const storage = require('../lib/storage.js');
const createError = require('http-errors');

const Drink = module.exports = function (name, flavor, isAlcoholic) {
  if(!name) throw createError(400, 'bad request - no name provided');
  if(!flavor) throw createError(400, 'bad reqeuest - no flavor provided');
  this.id = uuid();
  this.name = name;
  this.flavor = flavor;
  this.isAlcoholic = isAlcoholic;
};

Drink.createDrink = function (_drink) {  //prevent clashing
  debug('createDrink');
  try {
    debug('try block');
    var drink = new Drink(_drink.name, _drink.flavor, _drink.isAlcoholic);
    return Promise.resolve(storage.createItem('drink', drink));
  } catch(err) {
    debug('err block');
    return Promise.reject(err);
  }
};


Drink.fetchDrink = function (id) {

  debug('fetchDrink');
  if (id) {
    debug('has id', id);
    return storage.fetchItem('drink', id);
  }
  return Promise.reject(err);
};

Drink.deleteDrink = function (id) {
  debug('deleteDrink');
  return storage.deleteItem('drink', id);
}