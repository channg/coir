const fs = require('fs')
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

let rmdirSync = (function(){
  function iterator(url,dirs){
    var stat = fs.statSync(url);
    if(stat.isDirectory()){
      dirs.unshift(url);
      inner(url,dirs);
    }else if(stat.isFile()){
      fs.unlinkSync(url);
    }
  }
  function inner(path,dirs){
    var arr = fs.readdirSync(path);
    for(var i = 0, el ; el = arr[i++];){
      iterator(path+"/"+el,dirs);
    }
  }
  return function(dir,cb){
    cb = cb || function(){};
    var dirs = [];

    try{
      iterator(dir,dirs);
      for(var i = 0, el ; el = dirs[i++];){
        fs.rmdirSync(el);
      }
      cb()
    }catch(e){
      e.code === "ENOENT" ? cb() : cb(e);
    }
  }
})();


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
  fs.access(dist, function(err){
    if(err){
      fs.mkdirSync(dist);
    }
    copyIndex++
    _copy(null, src, dist);
    copyIndex--
    if(copyIndex===0){
      callback()
    }
  });
  function _copy(err, src, dist) {
    if(err){
      callback(err);
    } else {
      fs.readdir(src, function(err, paths) {
        if(err){
          callback(err)
        } else {
          paths.forEach(function(path) {
            var _src = src + '/' +path;
            var _dist = dist + '/' +path;
            fs.stat(_src, function(err, stat) {
              if(err){
                callback(err);
              } else {
                if(stat.isFile()) {
                  fs.writeFileSync(_dist, fs.readFileSync(_src));
                } else if(stat.isDirectory()) {
                  copyDir(_src, _dist, callback)
                }
              }
            })
          })
        }
      })
    }
  }
}

module.exports = {
  parseJson:parseJson,
  replaceN,replaceN,
  rmdirSync:rmdirSync,
  toExec:toExec,
  getFileMessageList:getFileMessageList,
  copyDir:copyDir
}