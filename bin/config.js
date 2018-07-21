const os = require('os');
const paths = require('path')
var path = paths.resolve(os.homedir(), '.coirspace')
var gpath = paths.resolve(os.homedir(), '.gcoircache')
module.exports = {
  cache_path:path,
  gchace_path:gpath
}