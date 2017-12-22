# COIR 
> coir是一个构建脚手架的脚手架工具，通过一定的配置，不需要任何代码，就可以生成一个定制版的脚手架工具。

通过npm引入coir 
```
npm install -g coir
```
接着你可以使用 **init** 命令，读取某一个npm上某一个coir配置项目。
例如 获取 **coir-test** 配置项目，使用命令    **coir init test**
```
coir init <package>
```
想要创建一个coir配置项目，可以使用coir-res项目
```
coir init res
```
使用短命令
```
coir i res
```
将coir-res模块缓存到本地
```
coir i res -c
```
想要清理本地的缓存文件
```
coir clean
```

你正在编辑你的coir配置项目，还没有发送到npm，但是想要测试，不要担心，进入你coir配置项目根目录，运行
```
coir link
```