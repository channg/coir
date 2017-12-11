var staticArray = []
var checkArray = []
const paths = require('path')
const pat = paths.resolve(__dirname, '../cache')
const utils = require('./utils')
let pa = require('./main')

function consoleL(log) {
    console.log(log)
}

function stdin(){
  process.stdin.setEncoding('utf8')
  process.stdin.on('readable', () => {
    var chunk = process.stdin.read()
    if(typeof chunk === 'string'){
      chunk = chunk.replace(/\r|\n|\r\n|\n\r/g,"")
      getStdIn(chunk)
    }
  });
}

function getStdIn(chunk){
  var ot = checkChunk(chunk)
  if(ot === '__again__'){
    tips()
  }
  else if (ot === '__exit__'){
    doneInPutAndBreak()
  }
  else{
    checkArray.push(ot)
    checkIsDone()?tips():doneInPut()
  }
}

/**
 * init
 * @param json
 * @private
 */
function _init(json){
  staticArray = json
  tips()
  stdin()
}

/**
 * end to parse file
 */
function doneInPut() {
  process.stdin.emit('end')
  pa(checkArray,staticArray.fileName,staticArray.end)
}

function doneInPutAndBreak() {
  process.stdin.emit('end')
  utils.rmdirSync(paths.resolve(pat,'package'))
}

/**
 * 检查输入值，如果匹配返回对应结果，否则return __again__
 * @param chunk
 */
function checkChunk(chunk) {
  var ot
  var list = staticArray.check[checkArray.length].input
  for(let i = 0;i<list.length;i++){
    if(new RegExp(list[i].test).test(chunk)){
      ot = returnInput(chunk,list[i].output)
    }
  }
  if(ot!==undefined&&ot!==null){
    return ot
  }else{
    return "__again__"
  }
}

function checkIsDone() {
  if(checkArray.length>=staticArray.check.length){
    return false
  }else{
    return true
  }
}

function tips() {
  let c
  if(c = staticArray.check[checkArray.length].color){
    consoleL(staticArray.check[checkArray.length].tip[c])
  }else{
    consoleL(staticArray.check[checkArray.length].tip)
  }
}

function returnInput(chunk,output) {
  if(output==='__exit__'){
    return '__exit__';
  }
  var ot = output.replace(/__input__/,function () {
    return chunk
  })
  return `${ot}`
}

module.exports = _init