'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');
const debug = require('debug')('superhero:storage');

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  debug('createItem');

  if (!schemaName) return Promise.reject(createError(400, 'bad request'));
  if (!item) return Promise.reject(createError(400, 'bad request'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then( () => item)
  .catch( err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id) {
  debug('fetchItem');

  if (!schemaName) return Promise.reject(createError(400, 'bad request'));
  if (!id) return Promise.reject(createError(400, 'bad request'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then( data => {
    debug('then block');
    try {
      let item = JSON.parse(data.toString());
      return item;
    } catch (err) {
      return Promise.reject(err);
    }
  })
  .catch( err => Promise.reject(createError(404, `${schemaName} not found`)));
};

exports.deleteItem = function(schemaName, id) {
  debug('deleteItem');

  if (!schemaName) return Promise.reject(new Error('expected schema name'));
  if (!id) return Promise.reject(new Error('expected id'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`);
};
