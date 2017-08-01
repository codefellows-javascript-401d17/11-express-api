'use strict';

const debug = require('debug')('book:storage');
const fsPromises = require('./fs-promises.js');

let storage = {};

module.exports = storage;

storage.createItem = function(categoryName, item) {
  debug('createItem');
  return fsPromises.createDirectory(`${__dirname}/../data/`)
    .then(fsPromises.createDirectory(`${__dirname}/../data/${categoryName}`))
    .then(fsPromises.writeFile(`${__dirname}/../data/${categoryName}/${item.id}.json`, JSON.stringify(item)))
    .then(() => item)
    .catch(error => Promise.reject(error));
};

storage.getItem = function(categoryName, id) {
  debug('getItem');
  return fsPromises.readFile(`${__dirname}/../data/${categoryName}/${id}.json`)
    .catch(error => Promise.reject(error));
};

storage.removeItem = function(categoryName, id) {
  debug('removeItem');
  return fsPromises.deleteFile(`${__dirname}/../data/${categoryName}/${id}.json`)
    .catch(error => Promise.reject(error));
};

storage.itemExists = function(categoryName, id) {
  return fsPromises.exists(`${__dirname}/../data/${categoryName}/${id}.json`);
};