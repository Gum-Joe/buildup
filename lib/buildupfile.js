// Buildup file
/**
 * Module dependencies
*/
module.exports = (buildup) => {
  buildup.task('default', function (done) {
    // Inside here is any task logic
    buildup.logger.info('Welcome to buildup!');
    buildup.logger.info('To create a task, use buildup.task(name, deps, method);')
    done();
  })
}
