// File for the api
'use strict'
/**
 * Module dependencies
*/
const Log = require('./logger').Logger;
const tools = require('./tools');
let logger = new Log('buildup')
require('colours');
/**
 * Vars
*/
let app = module.exports = {};
app.that = this;
app.that.tasks = {};

/**
 * Task loader api
 * @param name {String} name of task
 * @param deps {Array} or {Function} deps for task
 * @param method {Function} Method
*/
app.taskloader = (name, deps, method) => {
  if (typeof deps === 'function') {
    logger.debug('Loading task %o with no deps...', name)
    app.that.tasks[name] = { method: deps }
    logger.debug('Loaded task %o.', name)
  } else {
    const taskstringcol = "\'".green + name.green + "\'".green;
    logger.debug(`Loading task ${taskstringcol} with deps: %o...`, deps);
    app.that.tasks[name] = { deps: deps, method: method };
    logger.debug(`Loaded task ${taskstringcol} with deps: %o.`, deps);
  }
}

/**
 * API
*/
app.api = () => {
  /**
   * Sets the destdir
   * @param dir {String} directory
   * @return {String}
   */
  Object.prototype.destdir = function (dir) {
    if (typeof dir !== 'undefined') {
      this.project.destdir = dir;
      return this.project.destdir;
    } else {
      return this.project.destdir;
    }
  }
  let Api = {
    logger: new Log('task'),
    task: app.taskloader,
    tools: tools,
    project: {
      destdir: '.'
    },
    /**
     * Change the cwd
     * @param dir
     * {String} dir the change to
     */
     cwd: (dir) => {
       if (typeof dir !== 'undefined') {
         process.chdir(dir)
       } else {
         return process.cwd();
       }
     }
  };
  return Api;
}
