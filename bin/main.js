const fs = require('fs')
const fse = require('fs-extra')
const pro = require('./progress')
const paths = require('path')
const utils = require('./utils')
const g = require('./global')
let binOt = ""
const pat = paths.resolve(__dirname, '../cache')
let s =async function (list,ot) {
  list = parseInput(list)
  const cwd = process.cwd()
  let fnRex = ot.fileName
  let bin = ot.bin
  pro(3)
  /**
   * first to get not change folder
   */
  let fmList = getFileMessageList(paths.resolve(pat,'package/root'))
  /**
   * rename folder and file
   */
  checkFile(fmList,list,fnRex)
  /**
   * mv cache to work package
   */
  if(bin){
    await userBin(bin,list,fnRex)
  }
  let nfmList = getFileMessageList(paths.resolve(pat,'package/root'))
  pro(4)
  mv(nfmList,pat,cwd)
  pro(5)
  /**
   * clear cache
   */
  //utils.rmdirSync(paths.resolve(pat,'package'))
  process.stdout.write(binOt)
  console.log(ot.end)
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
  let rStr = replaceNum(output,list)
  rStr = g(rStr)
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
    let rFn = replaceNum(fn,list)
    rFn = g(rFn)
    if(fn!==rFn){
      if(rFn===""){
        //utils.rmdirSync(paths.resolve(item.path,item.fileName))
      }else{
        fse.copySync(paths.resolve(item.path,item.fileName),paths.resolve(item.path,rFn))
      }
    }
  })
}

function mv(fmList,pat,cwd) {
  fmList.forEach((item)=>{
    if(!/__\w+__/.test(item.fileName)){
      if(item.isFile){
        fse.ensureDirSync(cwd)
        fse.moveSync(item.absolute,paths.resolve(cwd,item.fileName),{overwrite:true})
      }else{
        fse.ensureDirSync(paths.resolve(cwd,item.fileName))
        mv(getFileMessageList(item.absolute),null,paths.resolve(cwd,item.fileName))
      }
    }
  })
}

async function userBin(bin,list,fnRex){
  let binList = getFileMessageList(paths.resolve(pat,'package/bin'))
  checkFile(binList,list,fnRex)
  let options = {
    stdio: "inherit",
    cwd:paths.resolve(pat,'package/bin')
  }
  await utils.toExec(bin,options)
}

function parseInput(list){
  let nl = []
  list.forEach((i1)=>{
    if(i1 instanceof Array) {
      let nnl = []
      i1.forEach(i2 => {
        let reInput = replaceNum(i2,list)
        reInput = g(reInput)
        nnl.push(reInput)
      })
      nl.push(nnl)
    }else{
      let reInput = replaceNum(i1,list)
      reInput = g(reInput)
      nl.push(reInput)
    }
  })
  return nl
}

function replaceNum(str,list){
  return str.replace(/__([0-9]+)(?:-([0-9]+))?__/g,function (match,p1,p2) {
    let ma = ""
    if(list[parseInt(p1)] instanceof Array){
      if(!p2) p2=0
      ma = list[parseInt(p1)][p2]
    }else{
      ma = list[parseInt(p1)]
    }
    return ma
  })
  
}



module.exports = s


