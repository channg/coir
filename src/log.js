require( "colors")
/**
 * show log by keys
 * @type {{NOKEY: module.exports.NOKEY}}
 */
module.exports = {
  NOKEY:function () {
    console.log('error: No package name was entered.'.red)
  }
}