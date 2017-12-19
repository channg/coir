const fs = require('fs')
const pro = require('./progress')
const paths = require('path')
const utils = require('./utils')
const pat = paths.resolve(__dirname, '../cache')
var s = function (list,{fileName,end,bin}) {
  let fnRex = fileName
  pro(3)
  /**
   * first to get not change folder
   */
  let fmList = getFileMessageList(paths.resolve(pat,'package/root'))
  /**
   * rename folder and file
   */
  checkFile(fmList,list,fnRex)
  let nfmList = getFileMessageList(paths.resolve(pat,'package/root'))
  /**
   * mv cache to work package
   */
  pro(4)
  mv(nfmList,pat,process.cwd())
  pro(5)
  userBin(bin,list,fnRex)
  /**
   * clear cache
   */
  utils.rmdirSync(paths.resolve(pat,'package'),function(e){})
  console.log(end)
}

function  checkFile(fmList,list,fnRex) {
  fmList.forEach((item)=>{
    if(item.isFile){
      if(new RegExp(fnRex).test(item.fileName)){
        let fp = paths.resolve(item.path,item.fileName)
        let output = fs.readFileSync(paths.resolve(item.path,item.fileName),"utf-8")
        replaceOutput(output,list,fp)
      }
    }
    if(item.isDirectory){
      var p = getFileMessageList(paths.resolve(item.path,item.fileName))
      checkFile(p,list,fnRex)
    }
  })
  /**
   *  wait
   */
  checkFileNameAndDirectoryName(fmList,list)
}

function replaceOutput(output,list,fp) {
  let rStr = output.replace(/__([0-9]+)(?:-([0-9]+))?__/g,function (match,p1,p2) {
    let ma = ""
    if(list[parseInt(p1)] instanceof Array){
      ma = list[parseInt(p1)][p2]
    }else{
      ma = list[parseInt(p1)]
    }
    return ma
  })
  fs.writeFileSync(fp,rStr)
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


function checkFileNameAndDirectoryName(fmList,list) {
  fmList.forEach(item=>{
    let fn = item.fileName
    let rFn = fn.replace(/__([0-9]+)(?:-([0-9]+))?__/g,function (match,p1,p2) {
      let ma = ""
      if(list[parseInt(p1)] instanceof Array){
        ma = list[parseInt(p1)][p2]
      }else{
        ma = list[parseInt(p1)]
      }
      return ma
    })
    if(fn!==rFn){
      fs.renameSync(paths.resolve(item.path,item.fileName),paths.resolve(item.path,rFn))
    }
  })
}

function mv(fmList,pat,cwd) {
  fmList.forEach((item)=>{
    fs.renameSync(item.absolute,paths.resolve(cwd,item.fileName))
  })
}

async function userBin(bin,list,fnRex){
  let binList = getFileMessageList(paths.resolve(pat,'package/bin'))
  checkFile(binList,list,fnRex)
  let options = {
    cwd:paths.resolve(pat,'package/bin')
  }
  var output  = await utils.toExec(bin,options)
  console.log(output)
}

module.exports = s


