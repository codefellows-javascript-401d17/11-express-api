'use strict';

const expect = require('chai').expect;
const request = require('superagent');

// require('../server.js');

let id;

describe('Book API', function() {
  it ('should return \'bad request\' if route not found.', function(done) {
    request.get('localhost:8000/ponies', function(error, response) {
      expect(response.status).to.equal(404);
      done();
    });
  });

  describe('GET: /', function() {
    it ('should return a welcome message.', function(done) {
      request.get('localhost:8000/', function(error, response) {
        expect(response.text).to.equal('Welcome to Nathan\'s Book API using Express.');
        done();
      });
    });
  });

  describe('POST: /api/book/', function() {
    it ('should return a book.', function(done) {
      request.post('localhost:8000/api/book')
        .send({
          title: 'Hamlet',
          author: 'Shakespeare',
          date: 1599,
          genre: 'Drama'
        })
        .end(function(error, response) {
          id = response.body.id;
          expect(response.status).to.equal(200);
          expect(response.body.id).to.be.a('string');
          expect(response.body.title).to.equal('Hamlet');
          expect(response.body.author).to.equal('Shakespeare');
          expect(response.body.date).to.equal(1599);
          expect(response.body.genre).to.equal('Drama');
          done();
        });
    });

    it ('should return an error if posting with no body.', function(done) {
      request.post('localhost:8000/api/book')
        .send()
        .end(function(error, response) {
          expect(response.status).to.equal(400);
          expect(response.text).to.equal('Book not provided.');
          done();
        });
    });

    it ('should return an error if posting with no title.', function(done) {
      request.post('localhost:8000/api/book')
        .send({
          author: 'Shakespeare',
          date: 1599,
          genre: 'Drama'
        })
        .end(function(error, response) {
          expect(response.status).to.equal(400);
          expect(response.text).to.equal('Title not provided.');
          done();
        });
    });

    it ('should return an error if posting with no author.', function(done) {
      request.post('localhost:8000/api/book')
        .send({
          title: 'Hamlet',
          date: 1599,
          genre: 'Drama'
        })
        .end(function(error, response) {
          expect(response.status).to.equal(400);
          expect(response.text).to.equal('Author not provided.');
          done();
        });
    });

    it ('should return an error if posting with no date.', function(done) {
      request.post('localhost:8000/api/book')
        .send({
          title: 'Hamlet',
          author: 'Shakespeare',
          genre: 'Drama'
        })
        .end(function(error, response) {
          expect(response.status).to.equal(400);
          expect(response.text).to.equal('Date not provided.');
          done();
        });
    });

    it ('should return an error if posting with no genre.', function(done) {
      request.post('localhost:8000/api/book')
        .send({
          title: 'Hamlet',
          author: 'Shakespeare',
          date: 1599,
        })
        .end(function(error, response) {
          expect(response.status).to.equal(400);
          expect(response.text).to.equal('Genre not provided.');
          done();
        });
    });
  });

  describe('GET: /api/book', function() {
    it ('should return an error if id not provided.', function(done) {
      request.get('localhost:8000/api/book', function(error, response) {
        expect(response.status).to.equal(400);
        expect(response.text).to.equal('Id not provided.');
        done();
      });
    });

    it ('should return an error if id not found.', function(done) {
      request.get('localhost:8000/api/book?id=1', function(error, response) {
        expect(response.status).to.equal(404);
        expect(response.text).to.equal('Book not found.');
        done();
      });
    });

    it ('should return a book.', function(done) {
      request.get(`localhost:8000/api/book?id=${id}`, function(error, response) {
        expect(response.status).to.equal(200);
        expect(response.body.id).to.be.a('string');
        expect(response.body.title).to.equal('Hamlet');
        expect(response.body.author).to.equal('Shakespeare');
        expect(response.body.date).to.equal(1599);
        expect(response.body.genre).to.equal('Drama');
        done();
      });
    });
  });

  describe('DELETE: /api/book', function() {
    it ('should delete a book.', function(done) {
      request.delete(`localhost:8000/api/book?id=${id}`, function(error, response) {
        expect(response.status).to.equal(204);
        done();
      });
    });
  });
});
