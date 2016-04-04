'use strict'
/**
 * Logging module
 */
/**
 * Module dependencies
 */
require('colours');
const debug = require('debug')('buildup')
const callerId = require('caller-id');
var prefixl;
/**
 * Logging class
 * @param prefix {String} Logger prefix
 * @param options {Options} Options
 */
function Logger(prefix, options) {
  this.prefix = prefix;
  prefixl = prefix;
}

/**
 * INFO method
 * @colour green
 * @param txt {String} Text to output
 */
Logger.prototype.info = (txt) => {
  if (process.env.NODE_ENV !== 'test') {
    if (typeof process.env.DEBUG !== 'undefined' && ~process.env.DEBUG.indexOf('buildup')) {
      debug(`${'info'.green} ${txt}`)
    } else {
      console.log(`${prefixl} ${'info'.green} ${txt}`);
    }
  }
};

/**
 * DEBUG method
 * @colour cyan
 * @param txt {String} Text to output
 * @param o {String} Extra stuff
 */
Logger.prototype.debug = (txt, o) => {
  if (process.env.NODE_ENV !== 'test') {
    if (typeof process.env.DEBUG !== 'undefined' && ~process.env.DEBUG.indexOf('buildup')) {
      if (typeof o !== 'undefined') {
        debug(`${'debug'.cyan} ${txt}`, o)
      } else {
        debug(`${'debug'.cyan} ${txt}`)
      }
    }
  }
};

/**
 * ERR method
 * @colour red
 * @param err {Error} Error
 * @param problem {String} The problem
 * @param advice {String} Advice
 */
Logger.prototype.err = (err, problem, advice) => {
  if (process.env.NODE_ENV !== 'test') {
    if (typeof process.env.DEBUG !== 'undefined' && ~process.env.DEBUG.indexOf('buildup')) {
      debug(`${'err!'.red} ${err.stack.split('\n')[0]}`);
      if (problem !== 'buildup') {
        debug(`${'err!'.red} This is not a problem with buildup,`)
        debug(`${'err!'.red} But a problem with ${problem}`)
        debug(`${'err!'.red} ${advice}`)
      } else {
        debug(`${'err!'.red} This is a problem with buildup,`)
        debug(`${'err!'.red} Please file a issue at https://github.com/Gum-Joe/buildup,`)
        debug(`${'err!'.red} Including this whole error message in it.`)
      }
      debug(`${'err!'.red} Full error message:`)
      debug(`${'err!'.red}`)
      for (var i = 0; i < err.stack.split('\n').length; i++) {
        debug(`${'err!'.red} ${err.stack.split('\n')[i]}`)
      }
    } else {
      console.log(`${prefixl} ${'err!'.red} ${err.stack.split('\n')[0]}`);
      if (problem !== 'buildup') {
        console.log(`${prefixl} ${'err!'.red} This is not a problem with buildup,`)
        console.log(`${prefixl} ${'err!'.red} But a problem with ${problem}`)
        console.log(`${prefixl} ${'err!'.red} ${advice}`)
      } else {
        console.log(`${prefixl} ${'err!'.red} This is a problem with buildup,`)
        console.log(`${prefixl} ${'err!'.red} Please file a issue at https://github.com/Gum-Joe/buildup,`)
        console.log(`${prefixl} ${'err!'.red} Including this whole error message in it.`)
      }
      console.log(`${prefixl} ${'err!'.red} Full error message:`)
      console.log(`${prefixl} ${'err!'.red}`)
      for (var i = 0; i < err.stack.split('\n').length; i++) {
        console.log(`${prefixl} ${'err!'.red} ${err.stack.split('\n')[i]}`)
      }
    }
    process.exit(1);
  } else {
    throw err;
  }
};


module.exports = { Logger: Logger };
