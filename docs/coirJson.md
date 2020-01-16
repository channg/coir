# coir.json

coir.json 是一个配置文件用于生成输入与输出，用于生成文件。
我们可以参考https://github.com/channg/coir-test/blob/master/coir.json

### inquire

inquire 是最外层的 map 对象，内部包含着选项数据集合
集合内应该存放多个键值对，键应该是一个大于 0 的数字，根据这个数字，我们会进入到文件中寻找**number**这样的字符串，替换为本条 inquire 输出的内容

```
{
    "inquire":{
        "10": {
            ...
        },
        "20":{
            ...
        }
    }
}
```

#### type

type 共有四中

- input 文字输入
- list 列表选择
- confirm 是与否选择
- editor 文本输入

根据不同的 type 会在命令行生成不同的样式

```
"inquire": {
    "1": {
      "type": "input",// list or confirm or editor
    },
    .....
}
```

#### question

问题：字符串类型

```
"inquire": {
    "1": {
      "type": "input",// list or confirm or editor
      "question": "hello world?",
    },
    .....
}
```

#### default

字符串，当直接输入回车的默认值。

```
"inquire": {
    "1": {
      "type": "input",
      "question": "hello world?",
      "default":"default is hello world"
    },
    .....
}
```

#### script

如果使用 script 字段，用户应该在 coir.json 平级的位置创建一个`script.js`
内容应该类似

```
module.exports = {
    captureNameFunction: function (name) {
        let upperCase = name.split("-").map((item)=>{return item[0].toUpperCase()+item.substring(1)}).join('')
        return [name, upperCase]
    }
}
```

例如当 script 字段 value 为`script.js` 中 exports 的某个方法，
coir 会主动调用方法，替换用户输入的值，
例如

```
 "1": {
      "question": "请输入view文件夹名称(请用 '-' 短横杠连接单词 )",
      "script": "captureNameFunction",
      "output": {
        "test": ".+"
      }
    },
```

当用户输入`aa-bb`时，会主动调用`script.js`中的`captureNameFunction`方法 ，并把用户输入的值替换成一个数组。
使用的时候`__1__`为用户的输入，`__1-1__`为方法返回的数组中的第二个元素。

#### output

output 是一个数组或者字符串。
为什么会是一个数组？因为当我们需要多个 test 判断用户输入的时候，做出不同操作，所以必须要有多个 output 对象。

```
"inquire": {
    "1": {
      "type": "input",
      "question": "coir test select(a/b),use the default",
      "default": "b",
      "output": [
        {
          "test": "^[a|A]$",
          "value": "0"
        },
        {
          "test": "^[b|B]$",
          "value": "1"
        }
      ]
    }
}
```

##### jump

jump 字段是output对象内部的属性，用于当用户输入之后，跳转到某个问题。
jump:"1"
jump字段的value是inquire的key值
jump字段跳跃过的内容将会输出空字符串。
```
"3": {
      "type": "input",
      "question": "coir test jump (a/b/c),If you choose b, you'll go back to the first question",
      "output": [
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
    },
```

##### value

value字段是用户输入后,test字段匹配了用户的输入,这时候将会输出的字段.
value:"__this__"代表用户的输入
你可以在__this__ 前后增加字符串,来自定义输出的内容.
value字段同样可以是一个数组,因为有时候我们需要在用户输入一个内容的时候,输出多个
例如value:["__this__.js","__this__.min.js"]
这时候用户输入了jquery,我们就可以得到一个数组["jquery.js","jqery.min.js"]
我们在编译目录可以通过__key-0__ __key-1__获取 数组内的内容
```
"output": {
        "test": ".*",
        "value": [
          "__this__",
          "100"
        ]
      }
```

##### test
判断 用户输入的值是否匹配
```
"output": {
        "test": ".+",
      }
```


### fileName

fileName是与 inquire同级的内容，值为字符串，表示会进入到这些匹配的字段去进行匹配

fileName字段是为了防止一些过度的编译。
只有当root下文件夹名字与filename匹配的时候，才会进行编译。 类似`fileName":".*\\.js$|.*\\.html$|.*\\.less$|.*\\.css$|.*\\.hbs$|.*\\.json$`
```
    {
        "inquire":{
            ...
        },
        "fileName":"*\\.js$"
    }
```

> 注意 json里的内容要转义

