## bin目录
> bin目录存放可执行文件，通过`coir.json`中`bin`字段执行。

例如
```
    bin:"node i"
```
ps:bin字段可以是一个数组,里面的命令将会顺序执行

当程序执行时过程中，将会执行`node i`。
bin目录内文件同样会被编译。

例如：
```
    what you name?
    channg
```
可以在bin目录里写入`__0__` 会被编译为`channg`
bin文件可以使用`__path__`获取文件编译。
nodejs文件可以通过`require("../../../node_modules/fs-extra")` 获取`fs-extra`模块，编译文件。

如果使用nodejs作为bin目录执行的文件。建议使用原生模块。


