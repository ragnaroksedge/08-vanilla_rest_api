'use strict';

const uuidv4 = require('uuid/v4');

module.exports = function(name, seat, region, words) {
  if(!name) throw new Error('expected family name');
  if(!seat) throw new Error('expected seat of power');
  if(!region) throw new Error('expected region');
  if(!words) throw new Error('expected house words');

  this.id = uuidv4();
  this.name = name;
  this.seat = seat;
  this.region = region;
  this.words = words;
};
