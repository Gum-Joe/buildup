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
 * @param file {String} File to load from
*/
app.loadFromFile = (file, callback) => {
  logger.debug('Loading from file...')
  fs.stat(path.join(PWD, file), function (err, stat) {
    if (err) {
      /* istanbul ignore next */
      logger.info('Could not find a \'buildupfile.js\' in the current directory!')
      logger.err(
        err,
        'the fact we couldn\'t find a \'buildupfile.js\' in the current directory',
        'To create a new file, run \'buildup init\''
      )
    }
  })
  logger.debug('Loading file...')
  let fileloaded = require(path.join(PWD, file))(api.api())
  return api.that;
}
