const utils = require("./utils")
const config = require("./commadConfig")
const dot = require("./dot")
module.exports = function () {
  let cacheList = utils.getFileMessageList(config.gcache)
  cacheList.forEach(item => {
    if(/\.tgz$/.test(item.fileName)){
      utils.rmdirSync(item.absolute)
    }
  })
  dot("CLEAN")
}