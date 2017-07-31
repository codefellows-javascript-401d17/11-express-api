'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom'});
const createError = require('http-errors'); //create custom err0r and status code
const debug = require('debug')('hike:storage');

module.exports = exports = {};

exports.createItem = function(schemaName, item){
  debug('storage:create item');
  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if(!item) return Promise.reject(createError(400, 'expected item'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then( () => item)
  .catch(err => Promise.reject(err));
};


exports.fetchItem = function(schemaName, id){
  debug('fetch item');
  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if(!id) return Promise.reject(createError(400, 'expected id'));

  return fs.readFileProm(`${__dirname}/../${schemaName}/${id}.jsson`)
  .then( data => {
    try {
      let item = JSON.parse(data.toString());
      return item;
    } catch (err) {
      return Promise.reject(err);
    }
  })
  .catch( err => Promise.reject());
};

exports.deleteItem = function(schemaName, item){
  debug('deleteItem');
  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if(!item) return Promise.reject(createError(400, 'expected name'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${item.id}.json`)
  .then( ()=> {
    try {
      console.log('delted that shit');
      return;
    } catch (err) {
      Promise.reject(err);
    }
  }).catch( err => Promise.reject(err));
};
