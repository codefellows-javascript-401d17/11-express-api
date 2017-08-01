'use strict';

const request = require('superagent');
const expect = require('chai').expect;

// require('../server.js');

describe('http Test Module', () => {
  let testId = '';
  it('Should have GET return a status of 404', (done) => {
    request.get('localhost:8000/api/failure')
    .end((err)=> {
      expect(err.status).to.equal(404);
      done();
    });
  });
  it('Should have GET return 400 with valid route', (done) => {
    request.get('localhost:8000/api/note')
    .end((err) => {
      expect(err.status).to.equal(400);
      done();
    });
  });
  it('Should have POST return 404 with valid route', (done) => {
    request.post('localhost:8000/api/note')
    .end((err) => {
      expect(err.status).to.equal(404);
      done();
    });
  });
  it('Should POST a route', (done) => {
    request.post('localhost:8000/api/note')
    .send({name: 'Logan', content: '21'})
    .end((err, res) => {
      if(err) return done(err);
      expect(res.status).to.equal(200);
      expect(res.body.name).to.equal('Logan');
      expect(res.body.content).to.equal('21');
      testId = res.body.id;
      done();
    });
  });
  it('Should GET a route', (done) => {
    request.get('localhost:8000/api/note')
    .send({id: testId})
    .end((err, res) => {
      if(err) return done(err);
      expect(res.status).to.equal(200);
      done();
    });
  });
});
