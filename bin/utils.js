const fs = require('fs')
function parseJson(str) {
  return eval('(' +str + ')')
}

function replaceN(str) {
  return str.replace(/\n\s+/gm,'')
}

let rmdirSync = (function(){
  function iterator(url,dirs){
    var stat = fs.statSync(url);
    if(stat.isDirectory()){
      dirs.unshift(url);//�ռ�Ŀ¼
      inner(url,dirs);
    }else if(stat.isFile()){
      fs.unlinkSync(url);//ֱ��ɾ���ļ�
    }
  }
  function inner(path,dirs){
    var arr = fs.readdirSync(path);
    for(var i = 0, el ; el = arr[i++];){
      iterator(path+"/"+el,dirs);
    }
  }
  return function(dir,cb){
    cb = cb || function(){};
    var dirs = [];

    try{
      iterator(dir,dirs);
      for(var i = 0, el ; el = dirs[i++];){
        fs.rmdirSync(el);//һ����ɾ�������ռ�����Ŀ¼
      }
      cb()
    }catch(e){//����ļ���Ŀ¼�����Ͳ����ڣ�fs.statSync�ᱨ���������ǻ��ǵ���û���쳣����
      e.code === "ENOENT" ? cb() : cb(e);
    }
  }
})();

module.exports = {
  parseJson:parseJson,
  replaceN,replaceN,
  rmdirSync:rmdirSync
}