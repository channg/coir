const fs = require('fs')
const pro = require('./progress')
const paths = require('path')
const utils = require('./utils')
const pat = paths.resolve(__dirname, '../cache')
var s = function (list,fnRex,endString) {
  pro(3)
  let fmList = getFileMessageList(paths.resolve(pat,'package/root'))
  checkFile(fmList,list,fnRex)
  let nfmList = getFileMessageList(paths.resolve(pat,'package/root'))
  /**
   * mv cache to work package
   */
  
  pro(4)
  mv(nfmList,pat,process.cwd())
  pro(5)
  utils.rmdirSync(paths.resolve(pat,'package'),function(e){})
  /**
   * clear cache
   */
  console.log(endString)
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
  let rStr = output.replace(/__([0-9]+)__/g,function (match,p1) {
    let ma
    if(ma = list[parseInt(p1)]){
      return ma
    }else{
      return ""
    }
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
    let rFn = fn.replace(/__([0-9]+)__/g,function (match,p1) {
      let ma
      if(ma = list[parseInt(p1)]){
        return ma
      }else{
        return match
      }
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




module.exports = s


//s([ 'a', 'true' ],".*\\.js")