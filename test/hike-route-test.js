'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const debug = require('debug')('hike:test');

require('../server.js');

describe('hike routes', function(){
  var hike = null;

  describe('POST: /api/hike', function(){
    it('should return a hike', function(done){
      request.post('localhost:8000/api/hike')
      .send({name:'some cool hike', distance:'3.4 miles', difficulty:'medium'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('some cool hike');
        expect(res.body.distance).to.equal('3.4 miles');
        expect(res.body.difficulty).to.equal('medium');
        hike = res.body;
        done();
      });
    });

    it('should return a bad request', function(done){
      request.post('localhost:8000/api/hike')
      .send({name:'some cool hike', blue:'green'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });

  describe('GET: /api/hike', function(){
    it('should return a hike', function(done){
      request.get(`localhost:8000/api/hike?id=${hike.id}`)
      .send({name:'some cool hike', distance: '3.4 miles', difficulty: 'medium'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('some cool hike');
        expect(res.body.distance).to.equal('3.4 miles');
        expect(res.body.difficulty).to.equal('medium');
        console.log('get request hike: ', res.body);
        done();
      });
    });
    it('should return a 404 error', function(done){
      request.get('localhost:8000/api/hike?id=123456')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('should return a 400 error', function(done){
      request.get('localhost:8000/api/hike?=12344567')
      .end(function(err, res){
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
});
