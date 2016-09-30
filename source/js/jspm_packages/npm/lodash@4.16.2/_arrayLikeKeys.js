/* */ 
var baseTimes = require('./_baseTimes'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isIndex = require('./_isIndex');
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var result = (isArray(value) || isArguments(value)) ? baseTimes(value.length, String) : [];
  var length = result.length,
      skipIndexes = !!length;
  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
module.exports = arrayLikeKeys;
