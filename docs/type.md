## input
>input是默认类型，也是最基础的类型，配置最简单，如果你只希望得到用户的输入

```
"1":{
      "question": "用户输入"
    }
```
这样就可以使用

## list
>list 会根据配置生成一个列表供用户通过上下键选择

```
"2":{
      "type": "list",
      "question": "你的选择是",
      "output":[{
        "test":"java",
        "value":"java好像不错"
      },{
        "test":"c#",
        "value":"原来你喜欢c#"
      }]
    }
```

test就是将要展示给用户的内容

## confirm

> confirm 是一个 生成 true 和 false 的 选择器

```
"3": {
      "type": "confirm",
      "question": "coir test cofirm",
      "default": false,
      "output": [
        {
          "test": "true",
          "value": "100"
        },
        {
          "test": false,
          "value": "1123123"
        }
      ]
    }
```

## editor

>editor 是一个编辑器 ，在windows下将使用txt，在mac linux下将使用 vim编辑器

```
"4": {
      "type": "editor",
      "question": "coir test the editor? in mac and *unix use the vim ,in windows use zhe txt"
    }
```

---

如果你想获取 一些例子  可以使用`coir i init`