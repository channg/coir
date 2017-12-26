#!/usr/bin/env node --inspect-brk
const utils = require('./utils')
const paths = require('path')
const pat = paths.resolve(__dirname, '../cache')
const program = require('commander')
const init = require('./init')
const clean = require('./clean')
const link = require('./link')
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
  .option("-s, --save", "save the package to cache")
  .action((dir,options) => {
    init(dir,{cache:options.cache?true:false})
  })

program
  .command('clean')
  .alias('c')
  .description('clean the cache')
  .action(()=>{
    clean()
  })

program
  .command('link')
  .alias('l')
  .description('link the coir package')
  .action(()=>{
    link()
  })

program.parse(process.argv);