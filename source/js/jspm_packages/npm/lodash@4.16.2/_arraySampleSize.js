/* */ 
var copyArray = require('./_copyArray'),
    shuffleSelf = require('./_shuffleSelf');
function arraySampleSize(array, n) {
  return shuffleSelf(copyArray(array), n);
}
module.exports = arraySampleSize;
