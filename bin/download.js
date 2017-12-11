const tar = require('tar')
const path = require('path')
const pro = require('./progress')
const fs = require('fs')
const utils = require('./utils')
const download = require('download')
const processJ = require('./process')
let Duplex = require('stream').Duplex
var pat = path.resolve(__dirname, '../cache')
module.exports =  function (url) {
  pro(1)
  download(url).then((data) => {
    var stream = bufferToStream(data)
    pro(2)
    stream.pipe(tar.x({sync: true,
      C:pat}))
    stream.on("end",()=>{
      var bufferStr = fs.readFileSync(pat + "/package/pdc.json","utf-8")
      var pdcJson = utils.parseJson(utils.replaceN(bufferStr))
      processJ(pdcJson)
    })
  })
}


function bufferToStream(buffer) {
  let stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

