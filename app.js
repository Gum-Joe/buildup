/**
 * Entry script for buildup
 */

/**
 * Module dependencies
 */
const server = require('./lib/server.js');
const Logger = require('logger').Logger;

module.exports = { Server: server.Server, Logger: Logger }
