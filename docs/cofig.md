## coir.json配置
例如：<a href="https://github.com/channg/coir-test/blob/master/coir.json">coir-test的配置文件</a>

```json
{
  "check":[
    {
      "tip":"what is your name ?",
      "color":"green",
      "input":[
        {
          "jump":"1",
          "test":".*",
          "output":[
            "__input__"
          ]
        }
      ]
    },{
      "tip":"do you want some coffee? (y/n)",
      "color":"green",
      "input":[
        {
          "test":"^y|Y{1}$",
          "output":"true"
        },
        {
          "test":"^n|N{1}$",
          "output":"__0__"
        }
      ]
    },
    {
      "tip":"you like number list (end:n)",
      "color":"green",
      "each":"*  __input__\n",
      "input":[
        {
          "test":"[0-9]+",
          "output":"__again__"
        },
        {
          "test":"^n|N{1}$",
          "output":"__next__"
        }
      ]
    }
  ],
  "fileName":".*\\.js",
  "end":"---- build end --",
  "bin":"node i"
}
```

## check
`check`是一个数组，每个元素是控制提示以及用户的输出。
### tip
`tip`是显示给用户的信息。
### color
`tip`tip显示的颜色，具体颜色参考<a href="https://www.npmjs.com/package/colors">colors</a>
### input
`input`也是一个数组用于控制用户的输入内容
#### jump
`jump`用户用户跳跃输入，当用户匹配了此选项，可以进行跳跃，`value`为 数字，例如`'jump':'1''`，当用户输入匹配时，将会跳过中间一个选项。
#### test
`test`是一个正则字符串，用于匹配用户的输入，如果匹配则返回`output`的内容，否则，匹配下一个，如果无用户匹配内容，将重新提示输入。
#### output
`output`是一个特殊字符串或者是一个数组，将用于当用户输入与`test`匹配的内容时，输出的内容。在输出之前，将会根据内容做一些特殊处理。

* `__input__`
    > 将会被替换为用户输入的内容。例如`__input__.js`若用户输入`coir`，输出将会变为`coir.js`

* `__exit__`
    > 将会直接结束程序
* `__reenter__`
    > 将会让用户重新输入

* `__again__`
    > `__again__`与`__next__`必须同时出现。`__again__`代表这是一个重复输入的选项，用户循环输入，知道`output`为`__input__`

* `__next__`
    > 代表这个循环输入已经结束。

### each
`each`是一个特殊配置，只有当output 含有`__again__`时有效，目的是使用一个模版，将循环的内容输出为一个字符串。
例如：
```
    {
      "tip":"you like number list (end:n)",
      "color":"green",
      "each":"*  __input__\n",
      "input":[
        {
          "test":"[0-9]+",
          "output":"__again__"
        },
        {
          "test":"^n|N{1}$",
          "output":"__next__"
        }
      ]
    }
```
当用户输入与`[0-9]+`匹配的内容时，循环不会停止，直到用户输入了`^n|N{1}$`的内容时，程序将会读取`each`的内容，编译后，将用户输入循环并将`each`的内容拼接到一起。
例如：
```
you like number list (end:n)
10
you like number list (end:n)
2
you like number list (end:n)
10
you like number list (end:n)
30
you like number list (end:n)
n
```
将会输出
```
* 10
* 2
* 10
* 30
```
## fileName
`fileName`字段是为了防止一些过度的编译。只有当root下文件夹名字与`filename`匹配的时候，才会进行编译。

## end
运行结束时的提示

## bin
运行结束时将运行的命令。
`cwd`为`bin`目录所在位置。


