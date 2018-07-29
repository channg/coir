const version = require('../package.json').version
const program = require('commander')
const log = require('./../src/log')
const commandConfig = require('./../src/commandConfig')
const init = require('./../src/init')
const utils = require('./../src/utils')
const clean = require('./../src/clean')

utils.ensureDirSync(commandConfig.cache)
utils.ensureDirSync(commandConfig.gcache)
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
  .option("-r, --saveRc [value]", "save the value to .coirrc")
  .action((dir, options) => {
    //if dir is undefined
    if (!dir) {
      log.NO_KEY()
      return
    }
    /**
     * overwrite config
     */
    if (options.save) {
      commandConfig.save = true
      if (options.save !== true) {
        commandConfig.gcache = options.save
      }
    }
    if (options.conf) {
      if (options.conf === true) {
        log.NO_CONF_VALUE()
      } else {
        try {
          let rc = utils.readJson('./.coirrc')
          if (rc[options.conf]) {
            commandConfig.useConf = true
            commandConfig.conf = rc[options.conf]
          } else {
            log.NOT_FINT_THIS_VALUE(options.conf)
          }
        } catch (err) {
          log.NOT_FIND_COIRRC()
        }
      }
    }
    if (options.saveRc) {
      if (options.saveRc === true) {
        log.NO_SAVE_CONF_VALUE()
      } else {
        utils.ensureFileSync('./.coirrc')
        commandConfig.saveConf = true
        commandConfig.saveConfValue = options.saveRc
      }
    }
    if (options.cache) {
      if (options.cache !== true) {
        commandConfig.cache = options.cache
      }
    }
    init(dir)
  })


program
  .command('clean')
  .alias('c')
  .description('clean the cache')
  .action(() => {
    clean()
  })


program.parse(process.argv)
