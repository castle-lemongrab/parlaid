// ✊🏿

'use strict';

const BaseEmitter = require('./emitter/base');
const JSONEmitter = require('./emitter/json');
const JSONLEmitter = require('./emitter/jsonl');

/* Export symbols */
module.exports = {
  Base: BaseEmitter,
  Default: JSONLEmitter,
  JSON: JSONEmitter, JSONL: JSONLEmitter
};

