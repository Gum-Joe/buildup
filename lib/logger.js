'use strict'
/**
 * Logging module
 */
/**
 * Module dependencies
 */
require('colours');
const callerId = require('caller-id');
var prefixl;
let that = this;
/**
 * Logging class
 * @param prefix {String} Logger prefix
 * @param options {Options} Options
 */
function Logger(prefix, options) {
  this.prefix = prefix;
  prefixl = prefix;
  that.debug = require('debug')(prefix)
}

/**
 * INFO method
 * @colour green
 * @param txt {String} Text to output
 */
Logger.prototype.info = (txt) => {
  if (process.env.NODE_ENV !== 'test') {
    if (typeof process.env.DEBUG !== 'undefined' && ~process.env.DEBUG.indexOf('buildup')) {
      that.debug(`${'info'.green} ${txt}`)
    } else {
      console.log(`${'[info]'.green} ${txt}`);
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
        that.debug(`${'debug'.cyan} ${txt}`, o)
      } else {
        that.debug(`${'debug'.cyan} ${txt}`)
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
  console.log("");
  if (process.env.NODE_ENV !== 'test') {
    if (typeof process.env.DEBUG !== 'undefined' && ~process.env.DEBUG.indexOf('buildup')) {
      that.debug(`${'err!'.red} ${err.stack.split('\n')[0]}`);
      if (problem !== 'buildup') {
        that.debug(`${'err!'.red} This is not a problem with buildup,`)
        that.debug(`${'err!'.red} But a problem with ${problem}`)
        that.debug(`${'err!'.red} ${advice}`)
      } else {
        that.debug(`${'err!'.red} This is a problem with buildup,`)
        that.debug(`${'err!'.red} Please file a issue at https://github.com/Gum-Joe/buildup,`)
        that.debug(`${'err!'.red} Including this whole error message in it.`)
      }
      that.debug(`${'err!'.red} Full error message:`)
      that.debug(`${'err!'.red}`)
      for (var i = 0; i < err.stack.split('\n').length; i++) {
        that.debug(`${'err!'.red} ${err.stack.split('\n')[i]}`)
      }
    } else {
      console.log(`${'err!'.red} ${err.stack.split('\n')[0]}`);
      if (problem !== 'buildup') {
        console.log(`${'err!'.red} This is not a problem with buildup,`)
        console.log(`${'err!'.red} But a problem with ${problem}`)
        console.log(`${'err!'.red} ${advice}`)
      } else {
        console.log(`${'err!'.red} This is a problem with buildup,`)
        console.log(`${'err!'.red} Please file a issue at https://github.com/Gum-Joe/buildup,`)
        console.log(`${'err!'.red} Including this whole error message in it.`)
      }
      console.log(`${'err!'.red} Full error message:`)
      console.log(`${'err!'.red}`)
      for (var i = 0; i < err.stack.split('\n').length; i++) {
        console.log(`${'err!'.red} ${err.stack.split('\n')[i]}`)
      }
    }
    process.exit(1);
  } else {
    throw err;
  }
};


module.exports = { Logger: Logger };
