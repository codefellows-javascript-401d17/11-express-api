const mocha = require('mocha');
const expect = require('chai').expect;
const request = require('superagent');
require('../server.js');

describe('endpoints', function () {
  describe('POST /api/drinks', () => {
    it('should respond with the body content for a post request with a valid body', (done) => {
      request.post('localhost:8000/api/drink')
        .send({ name: 'water', flavor: 'plain', isAlcoholic: false })
        .end(function (err, rsp) {
          if (err) return (err);
          expect(rsp.status).to.equal(200);
        });
      done();
    });
    it('should respond with "bad request" if no request body was provided or the body was invalid', (done) => {
      request.post('localhost:8000/api/drink')
        .send({})
        .end(function (err, rsp) {
          if (err) return (err);
          expect(rsp.status).to.equal(400);
        });
      done();
    });
  });
    describe('GET /api/drink', () => {
    it('should return a status code 200', (done) => {
      const id = '2f980f85-513d-4afc-9ade-f8de433a0c09';
      request
        .get('localhost:8000/api/drink')
        .query({ id: '2f980f85-513d-4afc-9ade-f8de433a0c09' })
        .end(function (err, rsp) {
          expect(rsp.status).to.equal(200);
          done();
        });
    });
  });
});



