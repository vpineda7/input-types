/* */ 
var getNative = require('./_getNative');
var nativeDefineProperty = getNative(Object, 'defineProperty');
module.exports = nativeDefineProperty;
