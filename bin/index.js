#!/usr/bin/env node
const utils = require('./utils')
const paths = require('path')
const pat = paths.resolve(__dirname, '../cache')
let program = require('commander');
const init = require('./init')
const version = require("../package.json").version
/**
 * in the beginning ,clean cache
 */
utils.rmdirSync(paths.resolve(pat,'package'))

program
  .version(version)
  .command('init <name>')
  .action(function (dir) {
    init(dir)
  })

program.parse(process.argv);