'use strict';
var assert = require('power-assert');

var eerr = require('../');

describe('eerr', function() {
  it('#module.main', function() {
    eerr.setup({
      badrequest: { status: 400, message: 'Bad Request.' },
      unauthorized: { status: 401, message: 'Unauthorized.' },  
      forbidden: { status: 403, message: 'Forbidden' },
      notfound: { status: 404, message: 'Not Found.' },
      internalservererror: { status: 500, message: 'Internal Server Error.' },
      gatewaytimeout: { status: 504, message: 'Gateway Timeout.' }
    });

    var result1 = eerr('badrequest');
    assert(result1.code === 'badrequest');
    assert(result1.status === 400);
    assert(result1.message === 'Bad Request.');

    var result2 = eerr('gatewaytimeout');
    assert(result2.code === 'gatewaytimeout');
    assert(result2.status === 504);
    assert(result2.message === 'Gateway Timeout.');

    var result3 = eerr('hoge');
    assert(result3.code === 'hoge');
    assert(result3.status === undefined);
    assert(result3.message === '');

    var result4 = eerr(new Error('hoge'));
    assert(result4.code === undefined);
    assert(result4.status === undefined);
    assert(result4.message === 'hoge');
  });
});
