'use strict';

var redis = require('redis');
var pub = redis.createClient();
var sub = redis.createClient();

/**
 * @param  {String} channel subscribing name
 * @param  {Number} count number of how many channel the 'sub' subscribed
 */
function handler_subscription (channel, count) {

  console.log('channel',channel);
  console.log('count',count);

  if (count === 2) {
    pub.publish('one','Hello world!');
    pub.publish('one',{hello:'world'});
    pub.publish('one',1);
  }
}

/**
 * @param  {String}
 * @param  {String}
 */
function handler_message (channel, message) {

  console.log('channel',channel);
  console.log('message',message);
  console.log('typeof message',typeof message);
}

sub.on('subscribe', handler_subscription);
sub.on('message', handler_message);

sub.on('ready', function () {
  sub.subscribe('one', 'two');
});
