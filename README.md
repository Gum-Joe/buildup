# buildup [![Build Status](https://travis-ci.org/Gum-Joe/buildup.svg?branch=master)](https://travis-ci.org/Gum-Joe/buildup) [![Coverage Status](https://coveralls.io/repos/github/Gum-Joe/buildup/badge.svg?branch=master)](https://coveralls.io/github/Gum-Joe/buildup?branch=master)
Buildup: the fast, easy to use, task runner for everyone.
# Requirements:

 - `node` >= `v4.x.x`

# Installation:
```
$ npm install -g Gum-Joe/buildup
```
# Usage:
```
$ buildup <task> [options]
```
# Getting started
First, you need a buildupfile.js. Use this sample one:
```javascript
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
```
Then run:
```
$ buildup hello
```
You should see, on screen:
```
[info] Running task 'hello'...
[info] Running task 'hello:world'...
[info] Hello World!
[info] Welcome to buildup!

```
If you want verbose logging, use:
```
$ DEBUG=buildup,task buildup hello
```
Then you should see:
```
$ DEBUG=buildup,task buildup hello
  buildup debug New Server created. +0ms
  buildup debug Server's name is 'buildtest' +4ms
  buildup info Running task 'hello'... +5ms
  buildup debug Loading from file... +0ms
  buildup debug Loading file... +1ms
  task debug Loading task 'hello:world' with no deps... +2ms
  task debug Loaded task 'hello:world'. +1ms
  task debug Loading task 'hello' with deps: [ 'hello:world' ]... +1ms
  task debug Loaded task 'hello' with deps: [ 'hello:world' ]. +2ms
  task debug Running dependent tasks of task 'hello' +1ms
  task info Running task 'hello:world'... +1ms
  task info Hello World! +0ms
  task info Welcome to buildup! +1ms
```
# Tests:
```
$ npm test
```
# Be Creative!
Be Creative: add all sorts to task logic, e.g:

- Executing build commands
- Compilation of files, such as `sass` files
- Creation of files
- Execution of test commands
