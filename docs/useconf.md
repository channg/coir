## 使用coir_config.json 文件  

>coir_config.json 文件是一个键值对文件，方便用于重复生成,格式如下

```json
{
  "xxx":["lululu"],
  "coir":["lalalal"]
}
```

当时用
`
    coir i somecoir -c xxx
`时，控制台将不再要求用户输入，而直接读取`coir_config.json`文件内的`xxx`对应的数组作为参数传递给程序

如果使用 `coir i somecoir -c` 将使用默认的 `coir ` 对应的数组 传递给程序

>coir_config.json 文件位置应该为 命令运行的目录


>ps: 数组内的数据 应该为output 输出的数据 ,有可能不是输入的值。





