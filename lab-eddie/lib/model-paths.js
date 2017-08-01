'use strict';

const debug = require('debug')('app:model-paths');
const jsonParser = require('body-parser').json();
const storage = require('./storage.js');
const Person = require('../model/person.js');
const Car = require('../model/car.js');
const Dog = require('../model/dog.js');
const Employee = require('../model/employee.js');
const Character = require('../model/character.js');



const modelRoutes = module.exports = {};

modelRoutes.models = {
  person : Person,
  car: Car,
  dog: Dog,
  employee: Employee,
  character: Character
};


modelRoutes.allRoutes = function(model, router) {
  modelRoutes.modelGet(model, router);
  modelRoutes.modelDelete(model, router);
  modelRoutes.modelPost(model, router);
};


modelRoutes.modelGet = function(model,router) {
  router.get(`/api/${model}`,jsonParser, function(req, res, next) {
    debug(`GET: api/${model}`);
    if (req.url.query.id) {
      storage.fetchItem(`${model}`, req.url.query.id)
      .then(item => res.JSON(item))
      .catch(err => next(err));

      return;

    } else if (req.url.query) {
      storage.fetchItem(`${model}`)
      .then(item => res.JSON(item))
      .catch(err => next(err));

      return;
    };
  });
};

modelRoutes.modelPost = function(model, router) {
  router.post(`/api/${model}`,jsonParser, function(req, res, next) {
    debug(`POST: api/${model}`);

    let params = [];
    for(let key in req.body) {
      params.push(req.body[key]);
    }

    var newObj = new modelRoutes.models[model](...params);

    storage.createItem(`${model}`, newObj)
    .then(item => res.JSON(item))
    .catch(err => next(err));
  });
}

modelRoutes.modelDelete = function(model, router) {

  router.delete(`/api/${model}`,jsonParser, function(req, res, next) {
    debug(`DELETE: api/${model}`);
    if (req.url.query.id) {
      
      storage.deleteItem(`${model}`, req.url.query.id)
      .then(item => res.JSON(item))
      .catch( err => next(err));

      return;
    };
  });
}

require('./auto-direct.js')(modelRoutes.models)