'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });
const createError = require('http-errors');
const debug = require('debug')('note:storage')

module.exports = exports = {};

exports.createItem = function(category, item) {
  debug('createItem');
  if(!category) return Promise.reject(createError(400, 'expected category'));
  if(!item) return Promise.reject(createError(400, 'expected item'));
  
  let stringObj = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${category}/${item.id}.json`, stringObj)
  .then(() => item)
  .catch(err => Promise.reject(createError(404, err.message)));
}


exports.fetchItem = function(category, id) {
  debug('fetchItem');
  if(!category) return Promise.reject(createError(400, 'expected category'));
  if(!id) return exports.fetchCategory(category);
  

  return fs.readFileProm(`${__dirname}/../data/${category}/${id}.json`)
  .then(data => {
    try {
      let item = JSON.parse(data.toString());
      return item;
    } catch (err) {
      return Promise.reject(createError(404, err.message));
    }
  })
};

exports.deleteItem = function(category, id) {
  debug('deleteItem');
  if(!category) return Promise.reject(createError(400, 'expected category'));
  if(!id) return Promise.reject(createError(400, 'expected id'));

  return fs.unlinkProm(`${__dirname}/../data/${category}/${id}.json`)
  .then(() => '')
  .catch(err => Promise.reject(createError(404, err.message)));

};

exports.fetchCategory= function(category) {
  debug('fetchCategory');
  if(!category) return Promise.reject(createError(400, 'expected category'));

  return fs.readdirProm(`${__dirname}/../data/${category}`)
  .then(data => {
    data = data.map(id => id.split('.json')[0])
    return data;
  })
  .catch(err => Promise.reject(createError(404, err.message)))
}