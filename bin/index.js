#!/usr/bin/env node --inspect
var program = require('commander');
var init = require('./init')
program
  .version('0.0.1')
  .command('init <name>')
  .action(function (dir) {
    init(dir)
  })

program.parse(process.argv);