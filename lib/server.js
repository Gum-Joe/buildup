'use strict'
/**
 * Buildup script for server
 */


/**
 * Module dependencies
 */
const fs = require('fs');
const path = require('path');
const YAML = require('yamljs');
const Log = require('./logger.js').Logger;
let logger;
/**
 * Server class
 * Creates a new server
 *
 * @param dir {String} Directory of build
 * @param options {Options} Options
 * @class
 */
function Server(dir, options) {
  if (typeof options !== 'undefined') {
    logger = new Log('buildup', options)
  } else {
    logger = new Log('buildup')
  }
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
      this.configFile = config;
    } else {
      this.configFile = config;
    }
    if (options.type === 'yml' || options.type === 'yaml' || options.type === 'YAML' || options.type === 'YML') {
      logger.debug('File type: YAML')
      this.config = YAML.parse(fs.readFileSync(this.configFile));
      return this.config;
    } else if (options.type === 'json' || options.type === 'JSON') {
      logger.debug('File type: JSON')
      this.config = require(this.configFile);
      return this.config;
    }
  } else {
    // Not a file
    if (typeof config !== 'object') {
      const err = new TypeError('Config was not an object')
      logger.err(err)
      return err;
    } else {
      this.config = config;
      return this.config;
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
var ser = new Server('..', { quite: false })
ser.nameServer('buildtest')
ser.loadConfig(`${__dirname}/../servertest/buildup.json`, { file: true, type: 'json' })
module.exports = {
    Server: Server
};
