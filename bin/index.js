#!/usr/bin/env node
let program = require('commander');
const init = require('./init')
const version = require("../package.json").version
program
  .version(version)
  .command('init <name>')
  .action(function (dir) {
    init(dir)
  })

program.parse(process.argv);