require( "colors")
module.exports.st = function (data) {
  return [`😄  是否创建新目录于  ${data.path}  (y/n)`.green,
           `😄  请输入文件夹名称  `.green]
}
module.exports.tip = [
  '😄   请重新输入'.red
]

module.exports.test = [
  /y|Y|n|N/,
  /n|N/
]

module.exports.log = [
  '||| init      package |||'.blue,
  '||| download  package |||'.blue,
  '||| Extract   package |||'.blue
]
