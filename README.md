### pdc
######只需要一个命令构建你想要的目录结构

pdc 是一个工具，用来构建你想要的文件目录而，可以构建但不仅仅是构建你的代码
> 使用 npm 
```
npm install -g pdc-cli 
```

* 通过 init  命令来构建
```
pdc init <your-package>
```
>your-package 同样是一个npm 上的 共有包 例如，你输入  **pdc init test**  ,pdc将自动寻找当前 你配置的 npm 源路径下 名字为 **pdc-test** 的npm package 并根据规则，生成选项，并最终构建你的文件仓库。
>
>以**pdc-**开头的仓库，叫pdc源仓库

使用已有的pdc源仓库来测试
```
pdc init test // test = npm view pdc-test
```

* pdc源仓库
>pdc 源仓库 是自定义文件的核心，类似树形结构，源仓库就是根节点。

pdc 源仓库 包含两大部分
>目录结构 如下
```
root/
pdc.json
package.json
```

**pdc.json** 
```
{
  "check":[
    {
      "tip":"输入选择文件夹名称",
      "color":"green",
      "input":[
        {
          "test":".*",
          "output":"__input__"
        }
      ]
    }
  ],
  "fileName":".*\\.js",
  "end":"测试结束输入"
}
```
>pdc.json的内容是当用户输入 **pdc init [someackage] ** 时，读取的配置文件，读取完毕后，将会自动进行配置选项。

* **check **
check 是一个数组，里面的每个元素类似一系列问题。用户需要根据问题回答出答案。例如上面的配置，**pdc init [some]**将会出现  
```
$ pdc init test
[ Init      package ]
[ Download  package ]
[ Extract   package ]
输入选择文件夹名称

```
* **tip**
>将输入的提示

* **color**
>输出的颜色，参考 **npm view colors**

* **input**
>input 也是一个数组，每个节点是为了匹配用户的输入，之后进行输出。

* **test**
>一个正则字符串，用于匹配用户的输入

* **output**
>output字段是用户输入完成之后的输出，这里有两个关键字
>**__input__** 代表等于 用户的输入，例如  **output:"__input__".js*。
>**__exit__**代表结束进程，整个过程终止。

* **fileName**
>fileName 涉及到下个不分，root内的格式。当check结束之后，用户的输入变为了一个数组。
>那么接下来，我们就要开始自定义我们文件夹的格式了。那么fileName字段就代表了我们希望进行编译的文件夹。
>fileName同样是一个正则表达式。

* **end**
>结束时的log


**root**
>root 是pdc源的一个根目录
>root下所有的文件包括文件夹都是pdc源
>当用户输入结束，用户的输入将根据output字段生成一个0~n长度的数组。
>编译期间会将**root**目录下的所有文件名含有**__number__**的字符串替换为用户的输入

like:
```
$ pdc init test
[ Init      package ]
[ Download  package ]
[ Extract   package ]
输入选择文件夹名称
test
[      Compile      ]
[      Building     ]
[ Clear      cache  ]

编译结束后 文件夹名称含有 __0__的将会被替换为 test
例如__0__.js => test.js
```

>**fileName**字段是为了防止一些过度的编译，当root根目录下的任意匹配了fileName 
>编译将进入到文件内部。
>如上面例子 在一个index.js内 含有**__0__**将会被替换为 test


#come on ，begin your first pdc sorce