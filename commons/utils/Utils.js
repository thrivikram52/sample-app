var _ = require("underscore");
var request = require("request");
var crypto = require('crypto');

var getInvalidParams = function (params, req) {
  return _.partition(params, function(element) {
    var param = req.param(element);
    return param === undefined || param === null;
  })[0];
};

var getMissingQueryFields = function (params, req) {
  return _.partition(params, function(element) {
    var param = req.query[element];
    return param === undefined || param === null;
  })[0];
};

var createErrResp = function (errorType, errMsgExt,debug) {
  var errCode = errorType.code;
  if (errCode === null)
    errCode = errorType.INTERNAL_SERVER_ERR;
  
  var error = {};
  error.code = errCode;
  error.reason= errorType.message + " : " + errMsgExt;
  error.debug = debug;  
  return {
    'ok': false,
    "error": error
  };
};
const ALGORITHM = 'aes-256-ctr', PASSWORD = 'ziPpr15@wes0m3';
var createCipher = function() {
  return crypto.createCipher(ALGORITHM, PASSWORD);
};

var encrypt = function(text) {
  var cipher = createCipher();
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};


module.exports = {
  "getInvalidParams" : getInvalidParams,
  "createErrResp":createErrResp,
  "getMissingQueryFields":getMissingQueryFields,
  "encrypt" : encrypt,
  "createCipher" : createCipher
}