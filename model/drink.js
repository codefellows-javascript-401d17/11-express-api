const uuid = require('uuid/v4');

const Drink = module.exports = function(name, flavor, isAlcoholic) {
  this.id = uuid();
  this.name = name;
  this.flavor = flavor;
  this.isAocoholic = isAlcoholic;
}