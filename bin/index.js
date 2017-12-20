#!/usr/bin/env node
const utils = require('./utils')
const paths = require('path')
const pat = paths.resolve(__dirname, '../cache')
let program = require('commander');
const init = require('./init')
const clean = require('./clean')
const version = require("../package.json").version
/**
 * in the beginning ,clean cache
 */
utils.rmdirSync(paths.resolve(pat,'package'))

program
  .version(version)

program
  .command('init [name]')
  .alias('i')
  .description('init the coir package')
  .option("-c, --cache", "use cache to init this package")
  .action(function (dir,options) {
    init(dir,{cache:options.cache?true:false})
  })

program
  .command('clean')
  .action(()=>{
    clean()
  })

program.parse(process.argv);