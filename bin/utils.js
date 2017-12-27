const fs = require('fs')
const fse = require('fs-extra')
const q = require('q');
var exec = require('child_process').exec;
const paths = require('path')
function parseJson(str) {
  return eval('(' +str + ')')
}
let copyIndex = 0
function toExec(cmdStr,options){
  var deferred  = q.defer()
  exec(cmdStr,options, function(err,stdout,stderr){
    if(err) {
      deferred.reject(stderr)
    } else {
      deferred.resolve(stdout)
    }
  });
  return deferred.promise;
}


function replaceN(str) {
  return str.replace(/\n\s+/gm,'')
}

function rmdirSync(path){
  fse.removeSync(path)
}



function getFileMessageList(path){
  let mList = []
  let list = fs.readdirSync(path)
  for(let i = 0;i<list.length;i++){
    let fPath = paths.resolve(path,list[i])
    let stat = fs.statSync(fPath)
    mList.push({
      fileName:list[i],
      path:path,
      absolute:fPath,
      isFile:stat.isFile(),
      isDirectory:stat.isDirectory()
    })
  }
  return mList
}

function copyDir(src, dist, callback) {
  fse.copy()
}

module.exports = {
  parseJson:parseJson,
  replaceN,replaceN,
  rmdirSync:rmdirSync,
  toExec:toExec,
  getFileMessageList:getFileMessageList,
  copyDir:copyDir
}