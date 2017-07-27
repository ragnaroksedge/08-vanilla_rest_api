'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const House = require('../model/house.js');

module.exports = function(router) {
  router.get('/api/house', function(req, res) {
    if(req.url.query.id) {
      storage.fetchItem('house', req.url.query.id)
      .then(house => {
        response.sendJSON(res, 200, house);
      })
      .catch(err => {
        response.sendText(res, 404, 'not found');
      });

      return;
    }
    response.sendText(res, 400, 'bad request');
  });

  router.post('/api/house', function(req, res) {
    try {
      var house = new House(req.body.name, req.body.seat, req.body.region, req.body.words);
      storage.createItem('house', house);
      response.sendJSON(res, 200, house);
    } catch(err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });
};
