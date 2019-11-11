# 命令

### init
```
coir init [package]
```
init 命令 可以使用短命令 `i`,表示初始化一个`coir`项目

init命令会主动去下载当前环境下,npm仓库中下载 `coir-[package]` 模块,读取`coir.json`,根据用户的输入,编译root文件夹下的问津,将文件输出到命令运行目录中.

查看命令参数
```
coir i --help
```
* -s,--save

例子:`coir i test -s`
>将npm 下载的包保存到本地,当下次输入非 -s 命令,将使用本地缓存 ,可以填写value 更换缓存地址,默认为`~/.gcoircache`

* -c,--conf [key]

例子:`coir i test -c key`


>当运行命令式,程序将会寻找运行目录下的 .coirrc 文件，寻找key对象，这样就不用用户再次输出.

* -r,--saveRc [key]

例子:`coir i test -r key`
生成的文件是这种格式https://github.com/channg/coir-test/blob/master/.coirrc
>当用户完成coir指令后,会自动生成.coirrc文件，将保存到key对象内，方便下次不必重复输入

* -a,--cache [path]

>修改编译文件夹,默认为`~/.coirspace`

* -p,--paht [path]

>修改输出文件夹路径 类似`-p ./src`


### clean

```
coir clean
```

>清理 `coir i -s` 保存的内容


### use

```
coir use [path]
```

>在拥有`coir.json`与`root`目录的位置path使用,相当于使用`coir i`命令,可以在包没有上传到npm上时测试使用.