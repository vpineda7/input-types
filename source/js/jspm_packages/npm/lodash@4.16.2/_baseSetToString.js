/* */ 
var constant = require('./constant'),
    identity = require('./identity'),
    nativeDefineProperty = require('./_nativeDefineProperty');
var baseSetToString = !nativeDefineProperty ? identity : function(func, string) {
  return nativeDefineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};
module.exports = baseSetToString;
