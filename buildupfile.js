// My sample task
/**
 * Module dependencies
*/
const tools = require('./app.js').tools;
/* istanbul ignore next */
module.exports = (buildup) => {
  buildup.task('hello:world', function (done) {
    // Inside here is any task logic
    buildup.logger.info('Hello World!');
    done();
  })
  buildup.task('hello', ['hello:world'], function (done) {
    // Inside here is any task logic
    buildup.logger.info('Welcome to buildup!');
    done();
  })
  buildup.task('src', function (done) {
    buildup.cwd('lib');
    buildup.tools.src('.', '**/*.js');
    done();
  })
}
