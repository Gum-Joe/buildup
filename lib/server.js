'use strict'
/**
 * Buildup script for server
 */


/**
 * Module dependencies
 */
const fs = require('fs');
const path = require('path');
const YAML = require('yaml-js');
const Log = require('./logger.js').Logger;
let logger;
let that = this;
/**
 * Server class
 * Creates a new server
 *
 * @param dir {String} Directory of build
 * @param options {Options} Options
 * @class
 */
function Server(dir, options) {
  logger = new Log();
  this.dir = path.resolve(dir);
  logger.info('New Server created.')
}

/**
 * Register the server's name
 * @param name {String} Name of server
 */
Server.prototype.nameServer = (name) => {
  this.name = name
  if (typeof process.env.DEBUG !== 'undefined' && ~process.env.DEBUG.indexOf('buildup')) {
    logger.debug('Server\'s name is %o', name)
  } else {
    logger.info(`Server is called ${name}`)
  }
};

/**
 * Load config
 * @param config {String} Config from a file
 * @param options {Object} Options
 */
Server.prototype.loadConfig = function (config, options) {
  logger.debug('Loading config...')
  // Is server named?
  if (typeof options !== 'undefined' && typeof options.file !== 'undefined' && options.file === true) {
    // file
    logger.debug('Loading config from file %o', config)
    if (path.resolve(config) !== path.normalize(config)) {
      config = path.join(this.dir, config);
      that.configFile = config;
    } else {
      that.configFile = config;
    }
    if (options.type === 'yml' || options.type === 'yaml' || options.type === 'YAML' || options.type === 'YML') {
      logger.debug('File type: YAML')
      that.config = YAML.load(fs.readFileSync(that.configFile));
      return that.config;
    } else if (options.type === 'json' || options.type === 'JSON') {
      logger.debug('File type: JSON')
      that.config = require(that.configFile);
      return that.config;
    }
  } else {
    // Not a file
    if (typeof config !== 'object') {
      const err = new TypeError('Config was not an object')
      logger.err(err)
      return err;
    } else {
      that.config = config;
      return that.config;
    }
  }
};

/**
 * Runs a task
 * @param task {String} Task to run
*/
Server.prototype.runTask = (task) => {
  if (!config.tasks.hasOwnProperty(task)) {

  }
};
// test
var ser = new Server('./servertest', { quite: false })
ser.nameServer('buildtest')
var c = ser.loadConfig(`buildup.json`, { file: true, type: 'json' })
module.exports = {
    Server: Server
};
