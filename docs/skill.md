## 查看用户输入详情

使用`coir`时，当输入结束，`coir`会生成一个对象，这时候你可以使`-r`将数据保存到本地
```bash
coir i test -r test1

or

coir use -r test1
```

这时候，查看名录根目录下的`.coirrc`文件，就可以查看用户最终输出的内容了。

`.coirrc`是一个json格式的文件

例：https://github.com/channg/coir-test/blob/master/.coirrc

## 选择输出文件夹，文件夹

当root目录中出现不想要输出的目录

我们只需要将目录或者文件名称设置为空字符串，这时候`coir`在编译过程就不再生成这个文件夹

那么如何让文件夹名称为空白呢？

* 通过多个output对象

```
"1":{
      "type": "list",
      "question": "test list",
      "output":[{
        "test":"has this",
        "value":"name"
      },{
        "test":"not have this",
        "value":""
      }]
    }
```

通过用户选择的不同，生成不同的问题件名，这时候将`__1__`设置为文件名并放入`root`文件夹内，如果用户选择了`not have this`,这个文件夹将不会输出


## value为数组

为什么value，有时候会是一个数组？

因为当用户输出一个问题的时候，我希望输出多个字符串。

```
"1":{
      "type": "list",
      "question": "use swiper?",
      "output":[{
        "test":"use",
        "value":["swiper.js","swierp.css"]
      },{
        "test":"not use",
        "value":[]
      }]
```    

如上面的例子：
如果用户选择了 useswiper

我们可以通过`__1-0__`获取`swiper.js`通过`__1-1__`获取`swiper.js`

>`__1__`与`__1-0__`的效果完全相同。
