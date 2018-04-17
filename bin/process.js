var staticArray = {}
const ansiEscapes = require('ansi-escapes')
var checkArray = []
var canReWrite = false
const paths = require('path')
const pat = paths.resolve(__dirname, '../cache')
const utils = require('./utils')
let pa = require('./main')
const fs = require('fs-extra')
let againStr = ""
let againList = []
let optionsY = {}
function consoleL(log) {
  process.stdout.write(log)
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
  if(chunk===""){
    chunk = staticArray.check[checkArray.length].default
  }
  let {ot,jump} = checkChunk(chunk)
  if(ot === '__reenter__'){
    if(canReWrite){
      process.stdout.write(ansiEscapes.cursorUp()+ansiEscapes.eraseDown+">>".red+"fail enter,please enter again !")
    }
    else{
      canReWrite = true
      process.stdout.write(">>".red+" fail enter,please enter again !")
    }
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
    againList.push(ot)
    cleanCmd(againList)
    canReWrite = false
    tips()
  }
  else if (ot === '__exit__'){
    doneInPutAndBreak()
  }
  else{
    
    if(ot === '__next__'){
      againList = []
      cleanCmd()
      checkArray.push(againStr)
    }else{
      cleanCmd(chunk)
      checkArray.push(ot)
    }
    canReWrite = false
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
function _init(json,options){
  optionsY = options
  staticArray = json
  if(options.conf){
    fs.readJson('./coir_config.json')
      .then(config => {
        if(options.conf===true){
          pa(config.coir,staticArray)
        }else{
          pa(config[options.conf],staticArray)
        }
      })
      .catch(err => {
        tips()
        stdin()
      })
  
  }else{
    tips()
    stdin()
  }
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


function cleanCmd(out) {
  let count = getRexCount("\n",staticArray.check[checkArray.length].tip)
  if(!out){
    process.stdout.write(ansiEscapes.cursorUp(count+1)+ansiEscapes.eraseDown)
  }else{
    if(canReWrite){
      if (againList.length>1){
        process.stdout.write(ansiEscapes.cursorUp(count+3)+ansiEscapes.eraseDown)
      }else{
        process.stdout.write(ansiEscapes.cursorUp(count+2)+ansiEscapes.eraseDown)
      }
      tips()
      process.stdout.write(`(${out})\n`)
    }else{
      if (againList.length>1){
        process.stdout.write(ansiEscapes.cursorUp(count+2)+ansiEscapes.eraseDown)
      }else{
        process.stdout.write(ansiEscapes.cursorUp(count+ 1)+ansiEscapes.eraseDown)
      }
      tips()
      process.stdout.write(`(${out})\n`)
    }
  }
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
    return {ot:"__reenter__",jump:jump}
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
    consoleL("?  ".red + staticArray.check[checkArray.length].tip[c])
  }else{
    consoleL("?  ".red + staticArray.check[checkArray.length].tip)
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

function getRexCount(rex,str){
  let count = 0
  str.replace(new RegExp(rex,"g"),(match)=>{
    count++
    return match
  })
  return count
}


module.exports = _init