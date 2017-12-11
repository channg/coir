#!/usr/bin/env node --inspect
var program = require('commander');
var init = require('./init')
var version = require("../package.json").version
program
  .version(version)
  .command('init <name>')
  .action(function (dir) {
    init(dir)
  })

program.parse(process.argv);