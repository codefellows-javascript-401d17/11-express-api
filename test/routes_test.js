const mocha = require('mocha');
const expect = require('chai').expect;
const request = require('superagent');
require('../server.js');
let drink = null; //placeholder

describe('endpoints', function () {
  describe('POST /api/drinks', () => {
    it('should respond with the body content for a post request with a valid body', (done) => {
      request.post('localhost:8000/api/drink')
        .send({ name: 'water', flavor: 'plain', isAlcoholic: false })
        .end((err, rsp) => {
          if (err) return (err);
          expect(rsp.status).to.equal(200);
          console.log(rsp.body);
          drink = rsp.body;
          done();
        });
    });
    it('should respond with 400 if no request body was provided or the body was invalid', (done) => {
      request.post('localhost:8000/api/drink')
        .send({})
        .end((err, rsp) => {
          if (err) return (err);
          expect(rsp.status).to.equal(400);
          done();
        });
    });
  });
  describe('GET /api/drink', () => {
    it('should return a status code 200', (done) => {
      console.log('get api drink:', drink.id);
      request
        .get('localhost:8000/api/drink')
        .query({ id: drink.id})
        .end((err, rsp) => {
          expect(rsp.statusCode).to.equal(200);
          done();
        });
    });
  });
  describe('GET /api/drink', () => {
    it('it should respond with 400 if no id was provided in the request', (done) => {
      request
        .get('localhost:8000/api/drink')
        .query({})
        .end((err, rsp) => {
          expect(rsp.status).to.equal(400);
          done();
        });
    });
  });
  describe('GET /api/drink', () => {
    it('it should respond with not found for valid requests made with an id that was not found', (done) => {
      request
        .get('localhost:8000/api/drink')
        .query({ id: '12345' })
        .end((err, rsp) => {
          expect(rsp.status).to.equal(404);
          done();
        });
    });
  });
});



