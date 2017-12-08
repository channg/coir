require('colors')
var replaceN = require('./utils').replaceN
const exec = require('child_process').exec
const log = require('./static').log
var donlows = require('./download')
module.exports = function (name) {
  var pdcName = `pdc-${name}`
  console.log(log[0])
  exec(`npm view ${pdcName}`,function (error, stdout, stderr) {
    if(error){
      console.log(error.message.red)
      return
    }
    if(stderr){
      console.log(stderr.red)
      return;
    }
    var stdoutJson = eval('(' +replaceN(stdout) + ')')
    donlows(stdoutJson.dist.tarball)
  })
}
