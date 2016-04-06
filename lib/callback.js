// Callback stuff
'use strict'
/**
 * Vars
*/
let app = module.exports = {};

/**
 * Done fun
 * @param err {Error} The error
*/
app.done = (err) => {
  if (typeof err !== 'undefined') {
    throw err;
  }
}
