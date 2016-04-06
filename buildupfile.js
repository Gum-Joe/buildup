// Sample buildup
//const tools = require('buildup').tools;
module.exports = (buildup) => {
  buildup.task('test', function (done) {
    buildup.logger.info('Task ran');
    done();
  })
}
