## root目录
root目录是一个工作目录，当运行`coir init `后，用户结束输入，程序会编译root目录下的内容，编译结束时会输出到当前用户操作的目录。

## 如何编译
根据`coir.json`的配置，每个`check元素`在用户输入完成后将会生成一个`output`，在所有`check`被用户输入完成时，将会生成一个数组。
程序会检查`root`目录下所有含有`__\w+__`的文件夹名称并将其替换为，`output`数组的其中一位。
例如：
```
what your name?
channg
```
用户结束后如果`root`目录下有文件名含有`__0__`的部分替换为`channg`，例如`__0__.txt`，将会被编译为`channg.txt`

同样，文件内部的`__0__`也会被替换为`channg`，但唯一不同的时，文件内部的将会首先验证`coir.json`内的`fileName`字段，程序只会编译文件名匹配的文件。

## 同时输出多行
当一个用户输入，我们想输出两条不同的内容。
```
    do you want use swiper(y/n)
    y
```
我们需要引入`swiper.css` 和`swiper.js`
我们只需要将`coir.json`匹配的`output`字段，设置为数组，例如：
```
{
      "tip":"do you want use swiper(y/n)",
      "color":"green",
      "input":[
        {
          "test":"^y|Y{1}$",
          "output":["<link rel=\"stylesheet\" href=\"../dist/css/swiper.min.css\">",
                    "<script src=\"../dist/js/swiper.min.js\"></script>"]
        },
        {
          "test":"^n|N{1}$",
          "output":""
        }
      ]
    }
```
这样我们可以通过`__0-0__`获取`swiper.css`,通过`__0-1__`获取`swiper.js`

ps: `__0-0__` ===`__0__`

## 选择性编译目录或文件

有时候，我们并不想输出某个文件夹或者文件，其实很简单，只要`output`字段为一个空字符串`""`，程序将删除文件名为空的文件夹，某些时候，我们需要在文件夹内进行选择。

我们可以使用`jump`属性，当用户选择某一个选项时，被跳过的选项将默认为`""`，这时候我们可以在文件夹名称上使用`__(被跳过的index)__` ，这时候这个文件夹，包括里面的文件，将不会被输出。


## 全局字段

code in <a href="https://github.com/channg/coir/blob/master/bin/global.js">global.js</a>

* `__path__`
    > `__path__`将被编译为 `process.cwd()`
