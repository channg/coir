## coir是什么
> coir 是一个脚手架、生成器，用来生成一个新的脚手架。所以说，coir是一个脚手架的脚手架。

只需要通过不同的配置，coir可以帮助开发者简单的生成一个cli工具，非常简易。

## coir的用途

所有一切重复性的工作都可以被提取出来，当你觉得你现在所做的事情，是重复的。你就可以使用coir来帮助你简化操作。通过 `coir init res` 你就可以生成一个coir配置项目。

## coir配置项目
coir配置项目是一个npm模块，命名规范是以`coir-`开头。
运行 `coir init <package>` 时，就是读取npm上`coir-<package>`的配置内容。

coir配置项目目录结构
```
project
│
└───bin
│   └───可执行文件
└───root
│   └───内容输出目录
└───coir.json
└───package.json
```

具体目录结构可以参考 <a href="https://github.com/channg/coir-test">coir-test</a> 
或者可以使用 ` coir init res `生成一个coir配置项目。

## 具体使用

coir会在你使用`coir init <package>`的时候读取*配置项目*根目录下的`coir.json`文件，根据配置，生成配置选项，再根据用户输入的选项，去编译`root`文件夹下的内容，再编译完成后，执行`bin`目录下的可执行文件。最终将内容输出到用户操作的目录下。

例如：
```sh
$ coir init test
[ Use        cache  ]
[ Extract   package ]
what is your name ?
channg
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
[      Compile      ]
[      Building     ]
[ Clear      cache  ]
---- build end --
```
