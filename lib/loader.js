// Loads from file
'use strict'
/**
 * Module dependencies
*/
const Log = require('./logger').Logger;
const fs = require('fs');
const path = require('path');
const api = require('./api');
let ENV = process.env;
let PWD = process.cwd();
let logger = new Log('buildup')
/**
 * Vars
*/
let app = module.exports = {};
/**
 * Load file
 *
*/
app.loadFromFile = () => {
  logger.debug('Loading from file...')
  let file;
  const done = this.async;
  fs.stat(path.join(PWD, 'buildupfile.js'), function (err, stst) {
    if (err) {
      logger.err(
        err,
        'the fact we couldn\'t find a \'buildupfile.js\' in the current directory',
        'To create a new file, run \'buildup init\''
      )
    }
  })
  file = require(path.join(PWD, 'buildupfile.js'))(api.api())
  return api.that;
}
