#!/usr/bin/env node
const utils = require('./utils')
const paths = require('path')
const pat = paths.resolve(__dirname, '../cache')
const program = require('commander')
const init = require('./init')
const clean = require('./clean')
const link = require('./link')
const static = require('./static')
const version = require("../package.json").version
const config = require("./config")
/**
 * in the beginning ,clean cache
 */
utils.rmdirSync(config.cache_path)
utils.ensureDirSync(config.cache_path)
utils.ensureDirSync(config.gchace_path)
console.log(static.init)
program
  .version(version)

program
  .command('init [name]')
  .alias('i')
  .description('init the coir package')
  .option("-s, --save", "save the package to cache")
  .option("-c, --conf [value]", "read the coir_config.json ")
  .option("-a, --cache [value]", "deploy cache path")
  .action((dir,options) => {
    let conf = false
    if(options.conf){
      conf = options.conf
    }
    if(options.cache){
      utils.ensureDirSync(config.cache_path)
      utils.rmdirSync(paths.resolve(options.cache,'package'))
      config.cache_path = options.cache
    }
    init(dir,{cache:options.save?true:false,conf:conf})
  })

program
  .command('clean')
  .alias('c')
  .description('clean the cache')
  .action((dir)=> {
    clean(dir)
  })

program
  .command('link')
  .alias('l')
  .description('link the coir package')
  .action(()=> {
    link()
  })

program.parse(process.argv)
