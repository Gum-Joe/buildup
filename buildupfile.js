// Sample buildup
//const tools = require('buildup').tools;
module.exports = (buildup) => {
  buildup.task('test:2', function (done) {
    buildup.logger.info('Task2 ran');
    done();
  })
  buildup.task('test', ['test:2'], function (done) {
    buildup.logger.info('Task ran');
    done();
  })
}
