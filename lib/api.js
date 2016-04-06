// File for the api
'use strict'
/**
 * Module dependencies
*/
const Log = require('./logger').Logger;
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
    app.that.tasks[name] = { method: deps }
  }
}

/**
 * API
*/
app.api = () => {
  return {
    logger: new Log('task'),
    task: app.taskloader
  };
}
