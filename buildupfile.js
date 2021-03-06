// My sample task
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
}
