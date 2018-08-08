const os = require('os');
const paths = require('path')
var path = paths.resolve(os.homedir(), '.coirspace')
var gpath = paths.resolve(os.homedir(), '.gcoircache')
/**
 *
 * @type {{cache: (Promise.<T>|*), gcacheL: (Promise.<T>|*), conf: string, save: boolean, useConf: boolean}}
 */
let config = {
  cache:path,
  gcache:gpath,
  conf:'',
  save:false,
  useConf:false,
  prefix:'coir',
  saveConf:false,
  saveConfValue:'',
  usePath:process.cwd()
}
module.exports = config