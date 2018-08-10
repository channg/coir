# coir.json

coir.json是一个配置文件用于生成输入与输出，用于生成文件。
我们可以参考https://github.com/channg/coir-test/blob/master/coir.json 

### inquire
    inquire是最外层的map对象，内部包含着选项数据集合
    集合内应该存放多个键值对，键应该是一个大于0的数字，根据这个数字，我们会进入到文件中寻找__number__这样的字符串，替换为本条inquire 输出的内容
    
### type
    type共有四中
    * input    文字输入
    * list     列表选择
    * confirm  是与否选择
    * editor   文本输入
    
    根据不同的type会在命令行生成不同的样式
### question
    问题：字符串类型
### default
    字符串，当直接输入回车的默认值。
   
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

### jump
    jump 字段是output对象内部的属性，用于当用户输入之后，跳转到某个问题。
    jump:"1"
    jump字段的value是inquire的key值
    jump字段跳跃过的内容将会输出空字符串。
### value
    value字段是用户输入后,test字段匹配了用户的输入,这时候将会输出的字段.
    value:"__this__"代表用户的输入
    你可以在__this__ 前后增加字符串,来自定义输出的内容.
    value字段同样可以是一个数组,因为有时候我们需要在用户输入一个内容的时候,输出多个
    例如value:["__this__.js","__this__.min.js"]
    这时候用户输入了jquery,我们就可以得到一个数组["jquery.js","jqery.min.js"]
    我们在编译目录可以通过__key-0__ __key-1__获取 数组内的内容
### fileName
    fileName是与 inquire同级的内容，值为字符串，表示会进入到这些匹配的字段去进行匹配
    
    fileName字段是为了防止一些过度的编译。
    只有当root下文件夹名字与filename匹配的时候，才会进行编译。 类似"fileName":".*\\.js$|.*\\.html$|.*\\.less$|.*\\.css$|.*\\.hbs$|.*\\.json$"
    
    {
        "inquire":{
            ...
        },
        "fileName":"*\\.js$"
    }
    