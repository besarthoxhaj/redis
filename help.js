'use strict';

var util = require('util');

module.exports = function (param) {

  return console.log(util.inspect(param,false,null));
}