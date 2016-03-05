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
    pub.publish('PLAY.SOCCER.ES_PL',{hello:'world'});
    pub.publish('PLAY.SOCCER.IT_SA',1);
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

/**
 * 
 */
function handler_p_subscription (pattern, count) {

  console.log('pattern',pattern);
  console.log('pcount',count);
  pub.publish('PLAY.SOCCER.EN_PR','Hello world!');
}

/**
 * 
 */
function handler_p_message (pattern, channel, message) {

  console.log('pattern',pattern);
  console.log('pchannel',channel);
  console.log('pmessage',message);
  console.log('typeof pmessage',typeof message);
}

sub.on('subscribe', handler_subscription);
sub.on('message', handler_message);
sub.on('pmessage', handler_p_message);
sub.on('psubscribe', handler_p_subscription);

sub.on('ready', function () {
  sub.psubscribe('PLAY.SOCCER.*');
});
