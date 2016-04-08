/**
 * Entry script for buildup
 */

/**
 * Module dependencies
 */
const server = require('./lib/server.js');
const Logger = require('./lib/logger').Logger;
const tools = require('./lib/tools');
module.exports = { Server: server.Server, Logger: Logger, tools: tools };
