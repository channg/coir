require('colors')
var replaceN = require('./utils').replaceN
const exec = require('child_process').exec
const pro = require('./progress')
var donlows = require('./download')
module.exports = function (name) {
  var pdaName = `pda-${name}`
  pro(0)
  exec(`npm view ${pdaName}`,function (error, stdout, stderr) {
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
