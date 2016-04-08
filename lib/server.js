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
const loadFromFile = require('./loader.js').loadFromFile;
const done = require('./callback.js').done;
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
  logger = new Log('buildup');
  this.dir = path.resolve(dir);
  logger.debug('New Server created.')
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
    logger.debug(`Server is called ${name}`)
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
      logger.err(err, 'the config loader params.', 'Please supply an object instead of a string for the method Server.loadConfig()')
      return err;
    } else {
      that.config = config;
      return that.config;
    }
  }
};
/**
 * Load plugins
*/
Server.prototype.loadPlugins = () => {
  logger.debug('Loading plugins...');
  // Load core
  that.tasklist = {};
  logger.debug('Loading core plugins...');
  const returnval = require('./core/build.js')()
  if (typeof returnval.multiTask !== 'undefined') {
    if (typeof returnval.tasks === 'undefined') {
      logger.err(new SyntaxError(`No tasks from multi-task \'buildup-${returnval.name}\'`), `buildup`, `Please ask the author of \'buildup-${returnval.name}\' to add tasks`)
    } else if (typeof returnval.tasks[0] === 'undefined') {
      logger.err(new TypeError(`Tasks list was a ${typeof returnval.tasks} instead of an array in the plugin \'buildup-${returnval.name}\'`)
        , `buildup`
        , `Please ask the author of \'buildup-${returnval.name}\' to add tasks as an array`)
    } else {
      for (var i = 0; i < returnval.tasks.length; i++) {
        if (typeof that.tasklist[returnval.tasks[i].task] !== 'undefined') {
          logger.err(new Error(`Task \'${returnval.tasks[i].task}\' already exists!`)
            , `buildup`
            , `Please remove one of the plugins that conflict (\'buildup-${returnval.name}\' and \'buildup-${that.tasklist[returnval.tasks[i].task].from}\')`)
        }
        that.tasklist[returnval.tasks[i].task] = returnval.tasks[i]
        that.tasklist[returnval.tasks[i].task].from = `${returnval.name}`
      }
    }
    logger.debug('Loaded plugin %o.', returnval.name)
    logger.debug('Done loading core plugins.')
  }
  if (typeof that.config.plugins !== 'undefined') {
    logger.debug('Loading npm plugins...')
    for (var i = 0; i < that.config.plugins.length; i++) {
      // Vars
      const returnval = require(that.config.plugins[i])()
      const plugin = that.config.plugins[i];
      // Multi task?
      if (typeof returnval.multiTask !== 'undefined') {
        // Tasks defined?
        if (typeof returnval.tasks === 'undefined') {
          logger.err(new SyntaxError(`No tasks from multi-task \'${plugin}\'`)
            , `the plugin ${plugin}`, `Please ask the author of \'${plugin}\' to add tasks`)
        } else if (typeof returnval.tasks[0] === 'undefined') {
          logger.err(new TypeError(`Tasks list was a ${typeof returnval.tasks} instead of an array in the plugin \'${plugin}\'`)
            , `the plugin ${plugin}`
            , `Please ask the author of \'${plugin}\' to add tasks as an array`)
        } else {
          for (var i = 0; i < returnval.tasks.length; i++) {
            if (typeof that.tasklist[returnval.tasks[i].task] !== 'undefined') {
              logger.err(new Error(`Task \'${returnval.tasks[i].task}\' already exists!`)
                , `the plugin ${plugin}`
                , `Please remove one of the plugins that conflict (\'${plugin}\' and \'buildup-${that.tasklist[returnval.tasks[i].task].from}\')`)
            }
            that.tasklist[returnval.tasks[i].task] = returnval.tasks[i]
            that.tasklist[returnval.tasks[i].task].from = `${returnval.name}`
          }
        }
        logger.debug('Loaded plugin %o.', plugin)
        logger.debug('Done loading npm plugins.')
      }
    }
  } else {
    logger.debug('Done loading plugins.')
  }
};

/**
 * Run a task
 *
 * @param task {String Array} Task to run(s)
*/
Server.prototype.runTask = function (task, options) {
  // Check type
  if (typeof that.config === 'undefined') {
    let tasks;
    if (typeof options !== 'undefined' && options.hasOwnProperty('subtask') && options.subtask === true) {
      // Avoid constant re-load
      logger.info(`Running sub-task \'${task}\'...`)
      tasks = options.tasks;
    } else {
      logger.info(`Running task \'${task}\'...`)
      tasks = loadFromFile('buildupfile.js').tasks;
    }
    if (typeof task !== 'array' && typeof task !== 'string') {
      logger.err(
        new TypeError(`Task param was not an array or string in function Server.runTask(), but a ${typeof task}!`),
        'the params supplied to Server.runTask() or buildup',
        'Please change the params, or file an issue at https://github.com/Gum-Joe/buildup'
      )
    } else {
      if (!tasks.hasOwnProperty(task)) {
        logger.info(`Task ${task} was not found!`)
        logger.err(
          new ReferenceError(`Could not find task ${task}!`),
          `the task supplied`,
          `Please check that the task exists`
        )
      } else {
        // Run it
        if (tasks[task].hasOwnProperty('deps')) {
          logger.debug('Running dependent tasks of task %o', task)
          for (var i = 0; i < tasks[task].deps.length; i++) {
            Server.prototype.runTask(tasks[task].deps[i], { subtask: true, tasks: tasks })
          }
          logger.info(`Proceeding with running task \'${task}\'...`)
        }
        tasks[task].method(done)
      }
    }
  } else {
    if (typeof task !== 'array' && typeof task !== 'string') {
      logger.err(
        new TypeError(`Task param was not an array or string in function Server.runTask(), but a ${typeof task}!`),
        'the params supplied to Server.runTask() or buildup',
        'Please change the params, or file an issue at https://github.com/Gum-Joe/buildup'
      )
    } else {
      // Load task
      let taskconfig;
      if (that.config.tasks.hasOwnProperty(task)) {
        logger.debug('Found the correct task!')
        taskconfig = that.config.tasks[task]
        logger.info(`Executing task \'${task}\'...`)
        that.tasklist[task].function({ logger: logger, config: that.config.tasks[task] })
      } else {
        logger.debug(`Finding task with { type: \'${task}\' }...`)
        for (var i in that.config.tasks) {
          if (that.config.tasks[i].hasOwnProperty('type') && that.config.tasks[i].type === task) {
            taskconfig = that.config.tasks[i];
          }
        }
        logger.info(`Executing task \'${task}\'...`)
      }
      // If no config, error
      if (!taskconfig) {
        logger.info(`Task ${task} was not found!`)
        logger.err(
          new ReferenceError(
            `Could not find task ${task}!`,
            `the task supplied`,
            `Please check that the task exists`
          )
        )
      }
    }
  }
};
module.exports = {
    Server: Server
};
