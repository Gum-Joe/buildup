'use strict'
/*
 * CLI for buildup
 */


/*
 * Module dependencies
 */
const app = require('../app');
const com = require('commander');
let taskrun;
/**
 * Setup
 */
com
  .version(require('../package').version)
  .usage('<task> [options...]')
  .action(function (task, options) {
     taskrun = task;
  })
  .option('-v, --verbose', 'Verbose logging')
  .parse(process.argv);

if (typeof taskrun === 'undefined') {
  taskrun = 'default'
}
var ser = new app.Server('./servertest', { quite: false })
ser.nameServer('buildtest')
//ser.loadConfig(`buildup.json`, { file: true, type: 'json' })
//ser.loadPlugins()
ser.runTask(taskrun)
