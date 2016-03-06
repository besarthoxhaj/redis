'use strict';

var h = require('./help.js');
var Hapi = require('hapi');
var socket = require('socket.io');

var server = new Hapi.Server();
server.connection({port:9000});
var listener = server.listener;

var io = socket(listener);

function handler (stuff) {

  h(stuff);
}

io.on('connection', handler);

server.start();
