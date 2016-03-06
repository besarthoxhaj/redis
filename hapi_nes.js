'use strict';

var Hapi = require('hapi');
var Nes = require('nes');

var server = new Hapi.Server();
server.connection({port:9000});

server.register(Nes, function (err) {

  server.subscription('/item/{id}');

  server.route({
    method: 'GET',
    path: '/h',
    config: {
      id: 'hello',
      handler: function (request, reply) {

        return reply('world!');
      }
    }
  });

  server.start(function (err) {
    server.publish('/item/5', { id: 5, status: 'complete' });
    server.publish('/item/6', { id: 6, status: 'initial' });
  });
});
