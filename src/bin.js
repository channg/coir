const version = require('../package.json').version
const program = require('commander')
const log = require('./log')
const commadConfig = require('./commadConfig')
const init = require('./init')
/**
 * version from package.json
 */
program
  .version(version)

/**
 * init command
 */
program
  .command('init [name]')
  .alias('i')
  .description('init the coir package')
  .option("-s, --save [value]", "save the package to cache")
  .option("-c, --conf [value]", "read the coir_config.json ")
  .option("-a, --cache [value]", "edit deploy cache path")
  .action((dir, options) => {
    //if dir is undefined
    if (!dir) {
      log.NOKEY()
      return
    }
    /**
     * overwrite config
     */
    if (options.save) {
      commadConfig.save = true
      if (options.save !== true) {
        commadConfig.gcache = options.save
      }
    }
    if (options.conf) {
      commadConfig.useConf = true
      if (options.conf !== true) {
        commadConfig.conf = options.conf
      }
    }
    if (options.cache) {
      if (options.cache !== true) {
        commadConfig.cache = options.cache
      }
    }
    init(dir)
  })


program.parse(process.argv)