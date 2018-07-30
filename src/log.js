require( "colors")
/**
 * show log by keys
 * @type {{NOKEY: module.exports.NOKEY}}
 */
module.exports = {
  NO_KEY:function () {
    console.log('error: No package name was entered.'.red)
  },
  NO_CONF_VALUE:function () {
    console.log('error: No conf value.'.red)
  },
  NOT_FIND_COIRRC:function () {
    console.log('error: Not find the .coirrc.'.red)
  },
  NOT_FINT_THIS_VALUE:function (value) {
    console.log(('error: Not find the this value ['+value+'].').red)
  },
  NO_SAVE_CONF_VALUE: function () {
    console.log('error: The -sc command need a value.'.red)
  },
  NO_QUESTIONS: function () {
    console.log('error: Not find questions, check your coir.json.'.red)
  },
  NO_SUCH_DIR: function () {
    console.log('error: The command runs the directory and does not find the root folder.'.red)
  }
}