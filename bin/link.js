const path = require('path')
const utils = require('./utils')
const fs = require('fs')
const fse = require('fs-extra')
const processJ = require('./process')
let pat = path.resolve(__dirname, '../cache')
const config = require("./config")
const pro = require('./progress')
module.exports = () => {
  if(config.cache_path){
    pat = config.cache_path
  }
  fs.mkdirSync(path.resolve(pat, 'package'));
  fse.copy( process.cwd(), path.resolve(pat, 'package'))
    .then(() =>{
      pro(8)
      var bufferStr = fs.readFileSync(pat + "/package/coir.json","utf-8")
      var coirJson = utils.parseJson(utils.replaceN(bufferStr))
      processJ(coirJson)
    })
    .catch(err => console.error(err))
  

}