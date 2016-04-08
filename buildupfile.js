// My sample task
/* istanbul ignore next */
module.exports = (buildup) => {
  /* istanbul ignore next */
  buildup.task('hello:world', function (done) {
    // Inside here is any task logic
    buildup.logger.info('Hello World!');
    done();
  })
  /* istanbul ignore next */
  buildup.task('hello', ['hello:world'], function (done) {
    // Inside here is any task logic
    buildup.logger.info('Welcome to buildup!');
    done();
  })
}
