# root目录
root目录是用于进行编译的目录,和普通文件一样，你只需要将文件或者文件夹防止于root目录之下就可以被coir运行之后的程序编译

https://github.com/channg/coir-test/tree/master/root


root目录下所有文件夹名为`__数字__`以及符合`coir.json`的`fileName`字段的文件内部的内容，都会被替换成为`inquire`最后得到的结果。

>git clone https://github.com/channg/coir-test.git
>coir use ./coir-test

就可以测试`coir-test`模块的内容

## 匹配的内容

`__{inquire的key}__`这种格式的数字是将会被编译的格式，例如`__1__`、`__100__`

当然，如果`value`字段也有可能是数组的，如果`value`字段是数组的话，`__1-0__`这样将会去寻找到数组内第一个元素

