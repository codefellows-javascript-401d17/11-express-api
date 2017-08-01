const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });
const debug = require('debug')('storage.js');
const createError = require('http-errors');

module.exports = exports = {};


exports.createItem = function (schemaName, item) {
  debug('#createItem');
  return new Promise(function (resolve, reject) {
    if (!schemaName) return reject(createError(400, 'schemaName param not provided'));
    if (!item) return reject(createError(400, 'item param not provided'));

    let item_json = JSON.stringify(item);
    debug('item', item);
    return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, item_json)
      .then(() => {
        debug('in storage', item);
        resolve(item);
      })
      .catch(err => reject(err));
  });
};

exports.fetchItem = function (schemaName, id) {
  debug('#fetchItem');
  var ids = [];


  return new Promise(function (resolve, reject) {
    if (!schemaName) return reject(createError(400, 'schemaName param not provided'));
    if (!id) return reject(createError(400, 'id param not provided'));

    return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
      .then((drink_buffer) => {
        debug(drink_buffer);
        try {
          let drink = JSON.parse(drink_buffer.toString());
          resolve(drink);
        } catch (err) {
          reject(err);
        }

      })
      .catch((err) => {
        debug(err);
        reject(createError(404, 'not found'));
      });
  });
};

exports.deleteItem = function (schemaName, id) {

  if (!schemaName) return Promise.reject(new Error('must provide schemaName param'));
  if (!id) return Promise.reject(new Error('must provide id param'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then(() => {
      Promise.resolve();
    })
    .catch((err) => {
      debug(err);
      Promise.reject(err)
    });

};

exports.fetchAllItems = function (schemaName) {
  return new Promise(function (resolve, reject) {
    if (!schemaName) return reject(new Error('schemaName param not provided'));
    //go to directory
    //iterate through files
  });
};