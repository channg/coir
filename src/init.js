const utils = require('./utils')
const {exec} = require('child_process')
const config = require('./commandConfig')
let dot = require('./dot')
const download = require('./download')

module.exports = function (name) {
  let tgzPath = getTgzCachePath(name, config.gcache)
  /**
   * has cache and not use -c -cache
   */
  if (tgzPath && !config.save) {
    download({name, tgzPath})
  }
  /**
   *  not use the cache
   */
  else {
    dot('INIT')
    var packageName = `${config.prefix}-${name}`
    getTarball(packageName).then((path) => {
      download({path, name, tgzPath})
    }).catch((err) => {
      utils.error(err)
    })
  }
}

/**
 * find the tgz in the global path
 * @param name
 * @param gcache
 * @returns {*}
 */
function getTgzCachePath(name, gcache) {
  let cachePath = null
  let list = utils.getFileMessageList(gcache)
  list.forEach(item => {
    if (item.fileName === `${name}.tgz`) {
      cachePath = item.absolute
    }
  })
  return cachePath
}

function getTarball(packageName) {
  return new Promise((resolve, reject) => {
    exec(`npm view ${packageName} dist.tarball`, function (error, stdout, stderr) {
      if (error) {
        reject(error.message)
      }
      if (stderr) {
        reject(stderr)
      }
      resolve(stdout)
    })
  })
}