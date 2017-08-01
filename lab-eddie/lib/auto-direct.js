'use strict'

const fs = require('fs')

//Automatically creates a data directory and folders for each model
const autoDataDir = module.exports = function(models) {

  let labDir = fs.readdirSync('.');
  if (!labDir.includes('data')) fs.mkdirSync('./data');
  autoModelDir(models);
};

const autoModelDir = function(models) {
  let modelKeys = Object.keys(models);
  let dataDir = fs.readdirSync('./data');
  modelKeys.forEach(key => {
    if(!dataDir.includes(key)) fs.mkdirSync(`./data/${key}`)});
}
