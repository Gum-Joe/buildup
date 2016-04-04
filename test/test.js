// Mocha tests
'use strict'
process.env.NODE_ENV = 'test';
/**
 * Module dependencies
 */
const path = require('path');
const chai = require('chai');
const fs = require('fs');
const sinon = require('sinon');
chai.should();
const expect = chai.expect;
const assert = chai.assert;
let sandbox;
// Server
const app = require('../app');
const Log = require('../lib/logger.js').Logger;
require('colours')
require('mocha-sinon');

describe('Server tests', function () {
  it('should check if a server object can be created', function (done) {
    const servertester = new app.Server(path.join(__dirname, '../servertest'), {quite: true})
    servertester.should.be.a('object')
    done();
  })
  it('should check if config can be loaded from a json file', function (done) {
    const servertester = new app.Server('./servertest', { quite: true })
    expect(servertester.loadConfig(`buildup.json`, { file: true, type: 'json' })).to.be.a('object')
    done();
  })
  it('should check if config can be loaded from a yml file', function (done) {
    const servertester = new app.Server('./servertest', { quite: true })
    expect(servertester.loadConfig(`buildup.yml`, { file: true, type: 'yaml' })).to.be.a('object')
    done();
  })
  it('should check if config can be loaded from a file object', function (done) {
    const servertester = new app.Server('./servertest', { quite: true })
    expect(servertester.loadConfig(require('../servertest/buildup.json'), { type: 'json' })).to.be.a('object')
    done();
  })
  it('should throw an error, if file object is not an object', function (done) {
    const servertester = new app.Server('./servertest', { quite: true })
    expect(() => servertester.loadConfig('test', { file: false })).to.throw(TypeError, 'Config was not an object')
    done();
  })
})

describe("Logger tests", () => {
  it(`should check if logger can be created`, (done) => {
    expect(new Log()).to.not.be.a('undefined')
    done();
  })
});
