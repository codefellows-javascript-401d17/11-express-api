'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('note:note');
const storage = require('../lib/storage.js');

const Note = module.exports = function(name, content){
  debug('Note constructor');

  if(!name) return createError(400, 'bad request');
  if(!content) return createError(400, 'bad request');

  this.id = uuidv4();
  this.name = name;
  this.content = content;
};

Note.createNote = (_note) => {
  debug('create note');
  try{
    let note = new Note(_note.name, _note.content);
    return storage.createItem('note', note);
  }catch(err){
    return Promise.reject(err);
  }
};

Note.fetchNote = (id) => {
  debug('fetch note');
  return storage.fetchItem('note', id);
};

Note.replaceNote = (_note) => {
  debug('replace note');
  let note = new Note(_note.name, _note.content);
  note.id = _note.target;
  return storage.updateItem('note', note);
};

Note.deleteNote = (id) => {
  debug('delete note');
  return storage.removeItem('note', id);
};
