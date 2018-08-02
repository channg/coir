const fs = require('fs')
const fse = require('fs-extra')
const config = require('./commandConfig')
const utils = require('./utils')
const path = require('path')
const dot = require('./dot')
const log = require('./log')
module.exports = main

function main(map, json) {
  try {
    saveConfig(map)
    const cwd = process.cwd()
    const fnRex = json.fileName||'.*'
    const fmList = utils.getFileMessageList(path.resolve(config.cache, 'package/root'))
    compile(fmList, map, fnRex)
    const compileFnList = utils.getFileMessageList(path.resolve(config.cache, 'package/root'))
    mv(compileFnList, cwd)
    utils.rmdirSync(path.resolve(config.cache, 'package'))
    dot('BUILD')
  }catch (err){
    log.NO_SUCH_DIR()
  }
}

/**
 * Compile the file and recurse if you find a folder
 * @param fmList
 * @param map
 * @param fnRex
 */
function compile(fmList, map, fnRex) {
  fmList.forEach((item) => {
    if (item.isFile) {
      
      if (new RegExp(fnRex).test(item.fileName)||/__([0-9]+)(?:-([0-9]+))?__/.test(item.fileName)) {
        console.log(item.fileName)
        let fp = path.resolve(item.path, item.fileName)
        let output = fs.readFileSync(path.resolve(item.path, item.fileName), "utf-8")
        replaceOutput(output, map, fp)
      }
    }
    if (item.isDirectory) {
      var subFmList = utils.getFileMessageList(path.resolve(item.path, item.fileName))
      compile(subFmList, map, fnRex)
    }
  })
  
  checkFileNameAndDirectoryName(fmList, map)
}

function replaceOutput(output, map, fp) {
  let rStr = replaceNum(output, map)
  fs.writeFileSync(fp, rStr)
}

/**
 * Replace __num__ with content
 * @param str
 * @param map
 * @returns {*|XML|string|void}
 */
function replaceNum(str, map) {
  return str.replace(/__([0-9]+)(?:-([0-9]+))?__/g, function (match, p1, p2) {
    let ma = ""
    if (map[p1] instanceof Array) {
      if (!p2) p2 = 0
      ma = map[p1][p2]
    } else {
      ma = map[p1]
    }
    if (ma) {
      return ma
    } else {
      return ""
    }
  })
}


function checkFileNameAndDirectoryName(fmList, list) {
  fmList.forEach(item => {
    let fn = item.fileName
    let rFn = replaceNum(fn, list)
    if (fn !== rFn) {
      if (rFn === "") {
        utils.rmdirSync(path.resolve(item.path, item.fileName))
      } else {
        fse.copySync(path.resolve(item.path, item.fileName), path.resolve(item.path, rFn))
        utils.rmdirSync(path.resolve(item.path, item.fileName))
      }
    }
  })
}


function mv(fmList, cwd) {
  fmList.forEach((item) => {
    if (!/__([0-9]+)(?:-([0-9]+))?__/.test(item.fileName)) {
      if (item.isFile) {
        fse.ensureDirSync(cwd)
        fse.moveSync(item.absolute, path.resolve(cwd, item.fileName), {overwrite: true})
      } else {
        fse.ensureDirSync(path.resolve(cwd, item.fileName))
        mv(utils.getFileMessageList(item.absolute), path.resolve(cwd, item.fileName))
      }
    }
  })
}

function saveConfig(map) {
  if (!config.saveConf)
    return
  
  let j = {}
  try {
    j = utils.readJson('./.coirrc')
    
  } catch (err) {
  
  }
  
  if (j) {
    j[config.saveConfValue] = map
    utils.outputJsonSync('./.coirrc', j)
  } else {
    utils.outputJsonSync('./.coirrc', {[config.saveConfVlue]: map})
  }
  
}