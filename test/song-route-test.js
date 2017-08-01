'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Song Routes', function() {
  var song = null;

  describe('POST: /api/song', function() {
    it('should return a song', function(done) {
      request.post('localhost:8000/api/song')
      .send({name: 'test name', band: 'test band', year: 'test year'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.band).to.equal('test band');
        expect(res.body.year).to.equal('test year');
        song = res.body;
        done();
      });
    });

    it('POST: should return 400', function(done) {
      request.post('localhost:8000/api/song')
      .send({album: 'jazzhands', trippy: 'false'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('GET: /api/song', function() {
    it('should return a song', function(done) {
      request.get(`localhost:8000/api/song?id=${song.id}`)
      .end(function(err, res) {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.band).to.equal('test band');
        expect(res.body.year).to.equal('test year');
        done();
      });
    });

    it('GET: should return 404', function(done) {
      request.get('localhost:8000/api/album?id=12345')
      .end(function(err, res) {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('GET: should return 400', function(done) {
      request.get('localhost:8000/api/song?=12344')
      .end(function(err, res) {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
});
