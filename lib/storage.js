'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Pr'});
const createError = require('http-errors');
const debug = require('debug')('note:storage');

module.exports = exports = {};

exports.createItem = function(schemaName, item){
  debug('create item');
  if(!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if(!item) return Promise.reject(createError(400, 'expected item'));

  return fs.writeFilePr(`${__dirname}/../data/${schemaName}/${item.id}.json`, JSON.stringify(item))
  .then(() => item)
  .catch((err) => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id){
  debug('fetch item');
  if(!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if(!id) return Promise.reject(createError(400, 'expected id'));

  return fs.readFilePr(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then((data) => {
    try{
      let item = JSON.parse(data.toString());
      return item;
    }catch(err){
      return Promise.reject(err);
    }
  })
  .catch((err) => Promise.reject(err));
};

exports.updateItem = (schemaName, item) => {
  debug('update item');
  if(!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if(!item) return Promise.reject(createError(400, 'expected input'));
  
  return fs.writeFilePr(`${__dirname}/../data/${schemaName}/${item.id}.json`, JSON.stringify(item))
  .then(() => Promise.resolve(item))
  .catch((err) => Promise.reject(err));
};

exports.removeItem = (schemaName, id) => {
  debug('remove item');
  if(!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if(!id) return Promise.reject(createError(400, 'expected id'));

  return fs.unlinkPr(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(() => Promise.resolve())
  .catch((err) => Promise.reject(err));
};
