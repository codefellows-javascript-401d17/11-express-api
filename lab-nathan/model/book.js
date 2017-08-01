'use strict';

const uuidv4 = require('uuid/v4');
const debug = require('debug')('book:book');
const storage = require('../lib/storage.js');

module.exports = Book;

function Book(title, author, date, genre) {
  debug('Book');

  this.id = uuidv4();
  this.title = title;
  this.author = author;
  this.date = date;
  this.genre = genre;
}

Book.get = function(id) {
  debug('get');

  return storage.getItem('book', id);
};

Book.create = function(bookData) {
  debug('create');

  try {
    let book = new Book(bookData.title, bookData.author, bookData.date, bookData.genre);
    return storage.createItem('book', book);
  } catch (error) {
    Promise.reject(error);
  }
};

Book.delete = function(id) {
  debug('delete');

  return storage.removeItem('book', id);
};