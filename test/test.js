// Mocha tests
process.env.NODE_ENV = 'test';
/**
 * Module dependencies
 */
const path = require('path');
const chai = require('chai');
chai.should();
const expect = chai.expect
// Server
const app = require('../app');

describe('Server tests', function () {
  it('should check if a server object can be created', function (done) {
    const servertester = new app.Server(path.join(__dirname, '../servertest'), {quite: true})
    servertester.should.be.a('object')
    done();
  })
  it('should check if config can be loaded froma json file', function (done) {
    const servertester = new app.Server(path.join(__dirname, '../servertest'), {quite: true})
    expect(servertester.loadConfig(path.join(__dirname, '../servertest/buildup.json'), {file: true})).to.be.a('object')
    done();
  })
})
