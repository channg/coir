const fs = require('fs')
const fse = require('fs-extra')
const paths = require('path')
require( "colors")

function parseJson(str) {
  return eval('(' +str + ')')
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

/**
 * Unified error message
 * @param str
 */
function error(str){
  console.log(str.red)
}


module.exports = {
  parseJson:parseJson,
  replaceN,replaceN,
  rmdirSync:rmdirSync,
  getFileMessageList:getFileMessageList,
  copyDir:copyDir,
  ensureDirSync:ensureDirSync,
  error:error
}