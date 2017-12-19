module.exports = function (str) {
  let bc = str.replace(/__([a-zA-Z0-9]+?)__/g,(match,p1)=>{
    if(global[p1]){
      return global[p1]
    }else{
      return match
    }
  })
  return bc
}

let global = {
  path:process.cwd().replace(/\\/g,'\\\\')
}