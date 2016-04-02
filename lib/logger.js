/**
 * Logging module
 */

/**
 * Module dependencies
 */
require('colours');
var prefixl;
/**
 * Logging class
 * @param prefix {String} Logger prefix
 */
function Logger(prefix) {
  this.prefix = prefix;
  prefixl = prefix;
}

/**
 * INFO method
 * @colour cyan
 * @param txt {String} Text to output
 */
Logger.prototype.info = (txt) => {
  console.log(`${prefixl} ${'info'.cyan} ${txt}`);
};


module.exports = { Logger: Logger };
