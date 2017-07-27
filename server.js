'use strict';

const http = require('http');
const House = require('./model/houses.js');
const storage = require('./lib/storage.js');
const Router = require('./lib/router.js');
const router = new Router();
const PORT = process.env.PORT || 3000;

router.get('/api/houses', function(req, res) {
  if(req.url.query.id) {
    storage.fetchItem('house', req.url.query.id)
    .then(house => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      res.write(JSON.stringify(house));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('house not found');
      res.end();
    });
    return;
  }

  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  res.write('bad request');
  res.end();
});

router.post('/api/houses', function(req, res) {
  try {
    var house = new House(req.body.name, req.body.seat, req.body.region, req.body.words);
    storage.createItem('house', house);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(house));
    res.end();
  } catch(err) {
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/houses', function(req, res) {
  if(req.url.query.id) {
    storage.deleteItem('house', req.url.query.id)
    .then( () => {
      res.writeHead(204, {
        'Content-Type': 'text/plain'
      });

      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('house not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  res.write('bad request');
  res.end();
});

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('server:', PORT);
});
