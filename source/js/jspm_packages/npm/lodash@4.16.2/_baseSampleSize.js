/* */ 
var shuffleSelf = require('./_shuffleSelf'),
    values = require('./values');
function baseSampleSize(collection, n) {
  return shuffleSelf(values(collection), n);
}
module.exports = baseSampleSize;
