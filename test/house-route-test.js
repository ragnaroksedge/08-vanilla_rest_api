'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('House Routes', function() {
  var house = null;

  describe('POST: /api/houses', function() {
    it('should return status code 400: bad request', function(done) {
      request.post('localhost:8000/api/houses')
      .send({})
      .end((err, res) => {
        expect(!res.body);
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should return a house', function(done) {
      request.post('localhost:8000/api/houses')
      .send({ name: 'Stark', seat: 'Winterfell', region: 'The North', words: 'Winter is Coming' })
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Stark');
        expect(res.body.seat).to.equal('Winterfell');
        expect(res.body.region).to.equal('The North');
        expect(res.body.words).to.equal('Winter is Coming');
        house = res.body;
        done();
      });
    });
  });

  describe('GET: /api/houses', function() {
    it('should return status code 400: bad request', function(done) {
      request.get('localhost:8000/api/houses?id=')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('should return a house', function(done) {
      request.get(`localhost:8000/api/houses?id=${house.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Stark');
        expect(res.body.seat).to.equal('Winterfell');
        expect(res.body.region).to.equal('The North');
        expect(res.body.words).to.equal('Winter is Coming');
        done();
      });
    });
  });

  describe('GET: /api/fakeroute', function() {
    it('should return status code 404', function(done) {
      request.get('localhost:8000/api/fakeroute')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
});
