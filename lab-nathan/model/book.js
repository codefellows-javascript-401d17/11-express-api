'use strict';

const uuidv4 = require('uuid/v4');
const debug = require('debug')('book:book');
const storage = require('../lib/storage.js');
const createError = require('http-errors');

module.exports = Book;

function Book(title, author, date, genre) {
  debug('Book');

  if (!title) {
    throw new Error('Title not provided.');
  }

  if (!author) {
    throw new Error('Author not provided.');
  }

  if (!date) {
    throw new Error('Date not provided.');
  }

  if (!genre) {
    throw new Error('Genre not provided.');
  }

  this.id = uuidv4();
  this.title = title;
  this.author = author;
  this.date = date;
  this.genre = genre;
}

Book.get = function(id) {
  debug('get');

  if (!id) {
    return Promise.reject(createError(400, 'Id not provided.'));
  }

  return storage.itemExists('book', id)
    .then(function(exists) {
      if (exists) {
        return Promise.resolve();
      }
      else {
        return Promise.reject(createError(404, 'Book not found.'));
      }
    })
    .then(() => Promise.resolve(storage.getItem('book', id)));
};

Book.create = function(bookData) {
  debug('create');

  try {
    let book = new Book(bookData.title, bookData.author, bookData.date, bookData.genre);
    return storage.createItem('book', book);
  } catch (error) {
    return Promise.reject(error);
  }
};

Book.delete = function(id) {
  debug('delete');

  return storage.removeItem('book', id);
};