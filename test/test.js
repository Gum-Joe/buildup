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
const callback = require('../lib/callback').done;
const loader = require('../lib/loader');
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

describe('Loader tests', () => {
  it('should check if loader can load a buildup.js file', (done) => {
    const loadedtask = loader.loadFromFile('buildupfile.js');
    expect(loadedtask.tasks).to.be.a('object')
    done();
  })
  it('should check that loader throws an error if it can not find a buildupfile.js', (done) => {
    expect(() => loader.loadFromFile('buildupfile.js.test')).to.throw(Error, "Cannot find module 'C:\\Users\\Kishan Sambhi\\Documents\\Projects\\buildup\\buildupfile.js.test'")
    done();
  })
})

describe('done() callback test', () => {
  it('should check if done() throws an error', (done) => {
    expect(() => callback(new Error('Test error'))).to.throw(Error, 'Test error')
    done();
  })
})
