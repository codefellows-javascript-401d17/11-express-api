const Promise = require('bluebird');
const debug = require('debug')('storage.js');

module.exports = exports = {};
let fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });

exports.createItem = function (schemaName, item) {
  debug('#createItem');
  return new Promise(function (resolve, reject) {
    if (!schemaName) return reject(new Error('schemaName param not provided'));
    if (!item) return reject(new Error('item param not provided'));
    if (!item) return reject(new Error('item param not provided'));

    let item_json = JSON.stringify(item);

    return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, item_json)
      .then(() => item)
      .catch(err => Promise.reject(err));
  });
};

exports.fetchItem = function (schemaName, id) {
  debug('#fetchItem');

  return new Promise(function (resolve, reject) {
    if (!schemaName) return reject(new Error('schemaName param not provided'));
    if (!id) return reject(new Error('id param not provided'));

    return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
      .then((drink_buffer) => {
        try {
          let drink = JSON.parse(drink_buffer.toString());
          return resolve(drink);
        } catch (err) {
          return reject(err);
        }

      })
      .catch(err => {
        reject(err);
      });
  });
};

exports.deleteItem = function (schemaName, id) {
  console.log('deleting');

  if (!schemaName) return Promise.reject(new Error('must provide schemaName param'));
  if (!id) return Promise.reject(new Error('must provide id param'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then(() => {
      Promise.resolve();
    })
    .catch((err) => Promise.reject(err));

};

exports.fetchAllItems = function (schemaName) {
  return new Promise(function (resolve, reject) {
    if (!schemaName) return reject(new Error('schemaName param not provided'));
    //go to directory
    //iterate through files
  });
};