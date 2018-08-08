# coir.json

coir.json是一个配置文件用于生成输入与输出，用于生成文件。
我们可以参考https://github.com/channg/coir-test/blob/master/coir.json 

### inquire
    inquire是最外层的map对象，内部包含着选项数据集合
    集合内应该存放多个键值对，键应该是一个大于0的数字，根据这个数字，我们会进入到文件中寻找__number__这样的字符串，替换为本条inquire 输出的内容
    
#### type
    type共有四中
    * input    文字输入
    * list     列表选择
    * confirm  是与否选择
    * editor   文本输入
    
    根据不同的type会在命令行生成不同的样式
### question
    问题：字符串类型
    
### output
    output 是一个数组或者字符串。
    为什么会是一个数组？因为当我们需要多个test判断用户输入的时候，做出不同操作，所以必须要有多个output对象。
    [
        {
          "test": "^[a|A]$",
          "value": "aaa"
        },
        {
          "jump":"1",
          "test": "^[b|B]$",
          "value": "jump"
        },
        {
          "test": "^[c|C]$",
          "value": "you select c"
        }
      ]              
### fileName
    fileName是与 inquire同级的内容，值为字符串，表示会进入到这些匹配的字段去进行匹配
    