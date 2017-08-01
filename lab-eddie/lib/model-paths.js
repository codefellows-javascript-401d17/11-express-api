'use strict';

const debug = require('debug')('app:model-paths');
const createError = require('http-errors');
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
  router.get(`/api/${model}`, function(req, res, next) {
    debug(`GET: api/${model}`);
    if (req.query) {
      storage.fetchItem(`${model}`, req.query.id)
      .then(item => res.json(item))
      .catch(err => {
        err = createError(404, err.message);
        next(err);
      });

      return;

    } else if (!req.query.id) {
      
      storage.fetchItem(`${model}`)
      .then(item => res.json(item))
      .catch(err => {
        err = createError(404, err.message);
        next(err);
      });
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
    try {
      var newObj = new modelRoutes.models[model](...params);
    } catch(err) {
      err = createError(400, err.message);
      next(err);
    }

    storage.createItem(`${model}`, newObj)
    .then(item => res.json(item))
    .catch(err => next(err));
  });
}

modelRoutes.modelDelete = function(model, router) {

  router.delete(`/api/${model}`,jsonParser, function(req, res, next) {
    debug(`DELETE: api/${model}`);
    if (req.query.id) {
      
      storage.deleteItem(`${model}`, req.query.id)
      .then(item => res.json(item))
      .catch(err => next(err));

      res.status(204)

      return;
    };
  });
}

require('./auto-direct.js')(modelRoutes.models)