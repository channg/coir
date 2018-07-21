const utils = require("./utils")
const progress = require("./progress")
const path = require('path')
let gcache = path.resolve(__dirname, '../gcache')
module.exports = function () {
  let cacheList = utils.getFileMessageList(gcache)
  cacheList.forEach(item => {
    if(/\.tgz$/.test(item.fileName)){
      utils.rmdirSync(item.absolute)
    }
  })
  progress(5)
}