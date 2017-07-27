'use strict';

const http = require('http');
const Router = require('./lib/router.js');
const router = new Router();
const PORT = process.env.PORT || 3000;

require('./route/house-route.js')(router);
const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('server:', PORT);
});
