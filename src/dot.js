require("colors")
const leftPad = require('left-pad')
module.exports = function (dotName, val) {
  switch (dotName) {
    case 'INIT':
      console.log('[ Init      package ]'.gray)
      break
    case 'DOWN_CACHE':
      console.log('[ Download to cache ]'.gray)
      break
    case 'USE_CACHE':
      console.log('[ Use        cache  ]'.gray)
      break
    case 'DOWN_BASE':
      console.log('[ Download  package ]'.gray)
      break
    case 'BUILD':
      console.log('[      Building     ]'.gray)
      break
    case 'CLEAN':
      console.log('[ Clear      cache  ]'.gray)
      break
    case 'USE_RC':
      let max_length = 0
      for (let key in val) {
        if(key.length>max_length){
          max_length = key.length
        }
      }
      for (let key in val) {
        console.log(""+leftPad(key + "",max_length-key.length+1).green + ': ' + (JSON.stringify(val[key])).gray)
      }
      break
  }
}