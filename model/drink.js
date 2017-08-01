const uuid = require('uuid/v4');
const debug = require('debug')('drink.js');
const storage = require('../lib/storage.js');

const Drink = module.exports = function (name, flavor, isAlcoholic) {
  this.id = uuid();
  this.name = name;
  this.flavor = flavor;
  this.isAlcoholic = isAlcoholic;
};

Drink.createDrink = function (_drink) {  //prevent clashing

  debug('createDrink');
  if (Object.keys(_drink).includes('name', 'flavor', 'isAlcoholic')) {

    let drink = new Drink(_drink.name, _drink.flavor, _drink.isAlcoholic);
    return storage.createItem('drink', drink);
  } 
  return Promise.reject();

};


Drink.fetchDrink = function (id) {
  debug('fetchDrink');
  debug(id);
  return storage.fetchItem('drink', id);
};

Drink.deleteDrink = function (id) {
  debug('deleteDrink');
  return storage.deleteItem('drink', id);
}