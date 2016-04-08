/**
 * Tools for buildup
*/
'use strict'
/**
 * Module dependencies
*/
const stream = require('stream');
const glob = require("glob")
/**
 * Vars
*/
let app = module.exports = {};
/**
 * src method
 * Gets the file ending in {suffix} in a dir
 *
 * @param dir {String} Directory to look in
 * @param suffixes {Array} Suffixes, of files, to look in
 * @return {stream.Readable}
*/
Function.prototype.pipe = function (method) {
  method(this)
};
app.src = (dir, suffixes) => {
  let returnval = glob.sync(`${dir}/${suffixes}`)
  return returnval;
}
