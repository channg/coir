const tar = require('tar')
const path = require('path')
const pro = require('./progress')
const fs = require('fs')
const utils = require('./utils')
const download = require('download')
const processJ = require('./process')
let Duplex = require('stream').Duplex
let pat = path.resolve(__dirname, '../cache')
const config = require("./config")


let gcache = path.resolve(__dirname, '../gcache')
module.exports =  function (url,options,name,cachePath) {
  if(config.cache_path){
    pat = config.cache_path
  }
  if(options.cache){
    pro(7)
    download(url).then(data => {
      fs.writeFileSync(path.resolve(gcache, name + '.tgz'), data);
    });
  }
  if(cachePath){
    pro(6)
    let stream = fs.createReadStream(cachePath);
    pro(2)
    stream.pipe(tar.x({sync: true,
      C:pat}))
    stream.on("end",()=>{
      var bufferStr = fs.readFileSync(pat + "/package/coir.json","utf-8")
      var coirJson = utils.parseJson(utils.replaceN(bufferStr))
      processJ(coirJson,options)
    })
  }else{
    pro(1)
    download(url).then((data) => {
      let stream = bufferToStream(data)
      pro(2)
      stream.pipe(tar.x({sync: true,
        C:pat}))
      stream.on("end",()=>{
        var bufferStr = fs.readFileSync(pat + "/package/coir.json","utf-8")
        var coirJson = utils.parseJson(utils.replaceN(bufferStr))
        processJ(coirJson,options)
      })
    })
  }
  
  

}


function bufferToStream(buffer) {
  let stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

