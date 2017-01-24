'use strict';

var watching = false;

var isWatching = function() {
  return watching;
};

var setWatching = function(arg) {
  watching = arg;
};

module.exports = {
  isWatching : isWatching,
  setWatching : setWatching
};
