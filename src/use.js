const path = require('path')
const utils = require('./utils')
const fs = require('fs')
const fse = require('fs-extra')
const config = require("./commandConfig")
const process = require("./process")
module.exports = () => {
  let cpath = path.resolve(config.cache, 'package')
  utils.ensureDirSync(cpath)
  fse.copy( config.usePath, cpath)
    .then(() =>{
      var bufferStr = fs.readFileSync(config.cache + "/package/coir.json","utf-8")
      var coirJson = utils.parseJson(utils.replaceN(bufferStr))
      process(coirJson)
    })
    .catch(err => console.error(err))
}