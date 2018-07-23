const download = require('download')
const tar = require('tar')
const fs = require('fs')
const config = require('./commadConfig')
const dot = require('./dot')
const path = require('path')
let {Duplex} = require('stream')
const utils = require('./utils')
module.exports = function ({path, name, tgzPath}) {
  /**
   * Need to download
   */
  if (path) {
    /**
     * use -s command
     */
    if (config.save) {
      toSaveCache(path, config.gcache, name)
    }
    /**
     *  download  and get coir.json if have the path
     */
    getCoirJsonWithDownload(path, config.cache).then((data) => {
      console.log('not')
      console.log(data)
    }).catch((err) => {
      utils.error(err.message)
    })
  } else {
    /**
     * use cache
     */
    getCoirJsonWithCache(tgzPath, config.cache).then((data)=>{
      console.log('cache')
      console.log(data)
    }).catch((err) => {
      utils.error(err.message)
    })
  }
}

/**
 * save cache
 * Asynchronously writes data to a file, replacing the file if it already exists.
 * @param url
 * @param cache
 * @param name
 */
function toSaveCache(url, cache, name) {
  dot('DOWN_CACHE')
  download(url).then(data => {
    fs.writeFileSync(path.resolve(cache, name + '.tgz'), data);
  }).catch((err) => {
    utils.error(err.message)
  })
}

/**
 * download and tar -x and readFile of coir.json
 * @param url
 * @param pat
 */
function getCoirJsonWithDownload(url, pat) {
  dot('DOWN_BASE')
  return new Promise((resolve, reject) => {
    download(url).then((data) => {
      let stream = bufferToStream(data)
      stream.pipe(tar.x({
        sync: true,
        C: pat
      }))
      stream.on("end", () => {
        var bufferStr = fs.readFileSync(pat + "/package/coir.json", "utf-8")
        var coirJson = utils.parseJson(utils.replaceN(bufferStr))
        resolve(coirJson)
      })
      stream.on('error', (err) => {
        reject(err)
      });
    }).catch((err) => {
      reject(err)
    })
  })
}


function getCoirJsonWithCache(cachePath, pat) {
  dot('USE_CACHE')
  return new Promise((resolve, reject) => {
    let stream = fs.createReadStream(cachePath)
    stream.pipe(tar.x({
      sync: true,
      C: pat
    }))
    stream.on("end", () => {
      var bufferStr = fs.readFileSync(pat + "/package/coir.json", "utf-8")
      var coirJson = utils.parseJson(utils.replaceN(bufferStr))
      resolve(coirJson)
    })
    stream.on('error', (err) => {
      reject(err)
    });
  })
  
}

/**
 * http://derpturkey.com/buffer-to-stream-in-node/
 * @param buffer
 * @returns {*}
 */
function bufferToStream(buffer) {
  let stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
}
