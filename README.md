eErr
====

Error Event Handller.

## Installation
```
npm install --save eerr
```

## Usage
### example
```javascript
var eerr = require('eerr');

eerr.setup({
  badrequest: { status: 400, message: 'Bad Request.' },
  unauthorized: { status: 401, message: 'Unauthorized.' },  
  forbidden: { status: 403, message: 'Forbidden' },
  notfound: { status: 404, message: 'Not Found.' },
  internalservererror: { status: 500, message: 'Internal Server Error.' },
  gatewaytimeout: { status: 504, message: 'Gateway Timeout.' }
});

// error code event.
eerr.on('badrequest', function(err) {
  console.log('bad request!');
});
// error status event.
eerr.on('404', function(err) {
  console.log('not found!');
});
// error status event.
eerr.on('4XX', function(err) {
  console.log('client error!');
});

var err = eerr('notfound');
console.log(err.name, err.code, err.status, err.message, err.stack);

// -- output
// not found!
// client error!
// Error notfound 404 Not Found ErrorStack...
```

## Contribution
1. Fork it ( https://github.com/iyu/eerr/fork )
2. Create a feature branch
3. Commit your changes
4. Rebase your local changes against the master branch
5. Run test suite with the `npm test; npm run-script jshint` command and confirm that it passes
5. Create new Pull Request
