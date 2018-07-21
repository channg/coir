const fs = require('fs')
const fse = require('fs-extra')
const q = require('q');
var spawn = require('child_process').spawn;
const paths = require('path')
const which = require('which')
function parseJson(str) {
  return eval('(' +str + ')')
}

function toExec(cmdStr,options){

  let [first, ...rest] = cmdStr.split(/\s/)
  if(first === "npm") {
    first = process.platform === 'win32'?"npm.cmd":"npm"
  }
  var deferred  = q.defer()
  var runner = spawn(which.sync(first),rest,options);
  runner.on('close', function () {
    deferred.resolve()
  });
  return deferred.promise;
}


function replaceN(str) {
  return str.replace(/\n\s+/gm,'')
}

function rmdirSync(path){
  fse.removeSync(path)
}

function ensureDirSync(path){
  fse.ensureDirSync(path)
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
  copyDir:copyDir,
  ensureDirSync:ensureDirSync
}