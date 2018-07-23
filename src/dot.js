require( "colors")
module.exports = function (dotName) {
  switch (dotName){
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
  }
}