// Sample buildup
const git = require('buildup-git');
const tools = require('buildup').tools;
const coffee= require('buildup-coffee');
const npm = require('buildup-npm')
const include = require('buildup-include');
module.exports = (buildup) => {
  buildup.task('clone', function () {
    return git.clone('https://github.com', {
      dir: './repo'
    });
  })
  buildup.task('install', ['clone'], function (done) {
    npm.install()
    done()
  })
  buildup.task('build:js', ['install'], function (done) {
    buildup.src('./src', '.coffee')
      .pipe(coffee.compile({
        out: './lib'
      }))
    done()
  })
  buildup.task('build:cpp', ['build:js'], function (done) {
    include([
      'https://github.com/Gum-Joe/jakhu-tester/master.zip'
    ])
    buildup.src('./cpp', '.cpp')
      .pipe(buildup.compile({
        compiler: 'autodetect',
        out: './build',
        nodeGyp: true
      }))
    done()
  })
  buildup.task('build', ['build:cpp'], function (done) {
    buildup.logger.info('Built!')
    done();
  })
}
