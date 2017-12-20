require('colors')
var replaceN = require('./utils').replaceN
const path = require('path')
let gcache = path.resolve(__dirname, '../gcache')
const exec = require('child_process').exec
const utils = require('./utils')
const pro = require('./progress')
var donlows = require('./download')
module.exports = function (name,options) {
  let list = utils.getFileMessageList(gcache)
  let cachePath
  list.forEach(item=>{
    if(item.fileName === `${name}.tgz`){
      cachePath = item.absolute
    }
  })
  /**
   * has cache and not use -c -cache
   */
  if(cachePath&&!options.cache){
    donlows(null,options,name,cachePath)
  }
  else{
    var coirName = `coir-${name}`
    pro(0)
    exec(`npm view ${coirName}`,function (error, stdout, stderr) {
      if(error){
        console.log(error.message.red)
        return
      }
      if(stderr){
        console.log(stderr.red)
        return;
      }
      var stdoutJson = eval('(' +replaceN(stdout) + ')')
      donlows(stdoutJson.dist.tarball,options,name)
    })
  }
}
