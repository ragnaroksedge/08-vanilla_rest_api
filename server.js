'use strict';

const http = require('http');
// const Spell = require('./model/spell.js');
// const Router = require('/.lib/router.js');
// const storage = require('./lib/storage.js');
// const router = new Router();

const PORT = process.env.PORT || 3000;

const server = http.createServer();

server.listen(PORT, () => {
  console.log('server:', PORT);
});
