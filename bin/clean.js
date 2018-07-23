const utils = require("./utils")
const progress = require("./progress")
const config = require("./config.js")
const path = require('path')
let gcache = config.gchace_path
module.exports = function (dir) {
  let cacheList = utils.getFileMessageList(dir||gcache)
  cacheList.forEach(item => {
    if(/\.tgz$/.test(item.fileName)){
      utils.rmdirSync(item.absolute)
    }
  })
  progress(5)
}