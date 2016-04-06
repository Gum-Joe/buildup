'use strict'
/**
 * Build plugin
*/

/**
 * Module dependencies
*/
const request = require('request');
const mkdirp = require('mkdirp');
const delayed = require('delayed');
const fs = require('fs');
const http = require('http');
const https = require('https');
const url = require('url');
/**
 * Variables
*/
const issuetxt = "file an issue at https://github.com/Gum-Joe/buildup"
/**
 * Task
 *
 * @param buildup {Object} Object to use
 */
const task = (buildup) => {
  const config = buildup.config;
  const logger = buildup.logger;
  let includedir;
  // Step 1: dirs
  if (typeof config.include !== 'undefined') {
    logger.debug('Making include dir...')
    // Create what user asks
    if (typeof config.options !== 'undefined' && typeof config.options.includeDir !== 'undefined') {
      logger.debug('Include dir: %o', config.options.includeDir)
      includedir = config.options.includeDir;
      // Make it
      mkdirp(config.options.includeDir, (err) => {
        // Throw err if err
        if (err) {
          logger.err(
            err,
            'mkdirp, or your current directory permissions',
            'Please '+issuetxt
          )
        } else {
          logger.debug('Created include dir.')
        }
      }); // mkdirp();
    } else {
      // Else, make include/
      includedir = 'include';
      // Make it
      mkdirp('./include', (err) => {
        // Throw err if err
        if (err) {
          logger.err(
            err,
            'mkdirp, or your current directory permissions',
            'Please '+issuetxt
          )
        } else {
          logger.debug('Created include dir.')
        }
      }); // mkdirp();
    }
  } // Finished making include dir
  // Step 2 : Includes
  if (typeof config.include !== 'undefined') {
    // Download
    // Delay
    delayed.delay(() => {
      logger.info('Downloading includes...')
      for (var i = 0; i < config.include.length; i++) {
        logger.info(`Downloading ${config.include[i]}...`)
        const todown = config.include[i];
        let file = todown.split("/");
        file = includedir+"/"+file[file.length -  1]
        request('http://codeload.github.com/Gum-Joe/jakhu-tester/zip/master', function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body);
            fs.writeFileSync(file, body)
          }
        })
      }
    }, 100)
  }
}

module.exports = () => {
  return {
    multiTask: true,
    name: "build-engine",
    tasks: [
      {
        task: "build",
        function: task
      }
    ]
  };
}
