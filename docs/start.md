# 开始

来到这儿，你应该知道了`coir`是做什么了的。

很明显，`coir`是为我们提供了一个代替复制粘贴，然后修改内容的方式。

让我们现在试试看。




### 创建`coir.json`

```
{
  "inquire": {
    "1": {
      "question": "what a day of today?"
    }
  }
}

```

这个json文件很直观，不必多解释什么

### root目录

创建`root`目录，并在root目录下创建一个空的`__1__.txt`

>root 目录要与coir.json 文件同级，里面存放着所有希望编译的内容。

这是后的目录结构应该是

    |-- coir.json
    |-- root
        |-- __1__.txt
### 运行
```
coir use
```

将会得到这样的命令行提示

```
? what a day of today?
```
输入任意之后

将会在当前目录下生成`*.txt`

---

因为`coir`会在root目录下搜索所有`__数字__`这种标志的文件名，然后将它替换为用户输入的内容。

当然如果你在文件内部加上`__1__`coir 也会帮你进行替换。

总体上原理就是这样

### 打包
如果你想将这个`coir包`提供给其他人使用，而其他然却不用关心你的源文件，怎么办呢。

使用`npm init`创建一个`package.json`        

之后将`name`字段修改为`coir-*`

使用`npm publish`将包发布到npm上(当然，前提你要拥有npm账号 https://www.npmjs.com/)

这时候目录结构应该是这样的

    |-- coir.json
    |-- root
        |-- __1__.txt
    |-- package.json
        
当你所在的npm源确定拥有你上传的包之后
> npm view coir-*

直接使用  
```bash
coir i *
```
就可以直接使用刚才与`coir use`相同的事情了。

例如我上传的包叫做`coir-channg`,那么我使用`coir i channg`即可

---

简单帮你完成以上步骤，不必再手动创建，使用下面的命令。

```
coir i init
```

使用`coir-init`模块 帮你生成一个可以直接使用的`coir`模块