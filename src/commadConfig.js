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
  conf:'coir_config',
  save:false,
  useConf:false,
  prefix:'coir'
}
module.exports = config