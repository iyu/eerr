/**
 * @fileOverview eErr
 * @name index.js
 * @author Yuhei Aihara <aihara_yuhei@cyberagent.co.jp>
 * https://github.com/iyu/eerr
 */
'use strict';
var util = require('util'),
  EventEmitter = require('events').EventEmitter;

function Err(obj) {
  Error.captureStackTrace(this, module.exports);
  util._extend(this, obj);
}
util.inherits(Err, Error);

function Eerr() {
  this.errors = {
    'notfound': { status: 404, message: 'Not Found.' }
  };
}
util.inherits(Eerr, EventEmitter);

Eerr.prototype.setup = function setup(errors) {
  this.errors = errors;
};

/**
 * get Err instance in errors.
 * @param {String} get
 */
Eerr.prototype.get = function get(code) {
  // create Err instance
  var err = new Err(util._extend({ code: code }, this.errors[code] || {}));

  // emit error code event
  this.emit(code, err);

  if (!this.errors[code]) {
    // emit not found in errors event
    this.emit('onNotFoundError', code);
  }

  if (err.status) {
    // emit status code event
    this.emit(err.status, err);
    // ex) 404 -> 4XX
    this.emit(('' + err.status).replace(/\d\d$/, 'XX'), err);
  }

  return err;
};

/**
 * extend error
 * @param {Object} err
 */
Eerr.prototype.extend = function extend(err) {
  if (util.isError(err)) {
    return new Err({ name: err.name, message: err.message, stack: err.stack });
  }
  return new Err(err);
};

var eerr = new Eerr();

module.exports = function eErr(code) {
  if (code instanceof Err) {
    return code;
  }
  if (typeof code === 'string') {
    return eerr.get(code);
  }
  return eerr.extend(code);
};

module.exports.setup = eerr.setup.bind(eerr);
module.exports.on = eerr.on.bind(eerr);
