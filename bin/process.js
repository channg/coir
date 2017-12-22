var staticArray = {}
var checkArray = []
const paths = require('path')
const pat = paths.resolve(__dirname, '../cache')
const utils = require('./utils')
let pa = require('./main')
let againStr = ""
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
  let {ot,jump} = checkChunk(chunk)
  if(ot === '__reenter__'){
    tips()
  }
  else if (ot.indexOf('__again__')===0){
    let bs
    ot = ot.replace('__again__',"")
    let eachStr = staticArray.check[checkArray.length].each
    if(eachStr){
      bs = eachStr.replace(/__input__/, () => {
        return ot
      })
      againStr += bs
    }
    tips()
  }
  else if (ot === '__exit__'){
    doneInPutAndBreak()
  }
  else{
    
    if(ot === '__next__'){
      checkArray.push(againStr)
    }else{
      checkArray.push(ot)
    }
    if(jump){
      jumpTo(jump)
    }
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
  pa(checkArray,staticArray)
}

function doneInPutAndBreak() {
  process.stdin.emit('end')
  utils.rmdirSync(paths.resolve(pat,'package'))
}

/**
 * check it ,if false return __reenter__
 * @param chunk
 */
function checkChunk(chunk) {
  let isCheck = false
  var ot
  var jump
  var list = staticArray.check[checkArray.length].input
  for(let i = 0;i<list.length;i++){
    if(new RegExp(list[i].test).test(chunk)){
      if(!isCheck){
        ot = returnInput(chunk,list[i].output)
        jump = list[i].jump
        isCheck= true
      }
    }
  }
  if(ot!==undefined){
    return {ot:ot,jump:jump}
  }else{
    return "__reenter__"
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

/**
 * replace user input
 * @param chunk
 * @param output
 * @returns {*}
 */
function returnInput(chunk,output) {
  if(output==='__exit__'){
    return '__exit__';
  }
  if(output instanceof Array){
    let nOutput = []
    output.forEach((item)=>{
      let it = checkOt(item,chunk)
      nOutput.push(it)
    })
    return nOutput
  }
  var ot = checkOt(output,chunk)
  return `${ot}`
}

function checkOt(ot,chunk) {
  let it = ot.replace(/__input__/,function () {
    return chunk
  })
  if(it==='__again__'){
    return `__again__${chunk}`
  }
  return it
}

function jumpTo(num){
  let step = num
  if(step>0){
    for(;step--;step<=0){
      checkArray.push("")
    }
  }else{
    for(;step++;step>=0){
      checkArray.pop()
    }
  }
}


module.exports = _init