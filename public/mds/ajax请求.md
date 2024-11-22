## Ajax 请求

### 1.什么是Ajax ?

就是使用 **XMLHttpRequest** 对象与服务器通信。

### 2.Ajax优缺点

优点：

- 页面无需刷新与服务端进行通信
- 可以实现局部刷新功能

缺点：

- 存在跨域问题
- 对SEO不友好

### 3.实现XHR请求数据的步骤

- 创建 `XMLHttpRequest` 对象

- 通过 `XMLHttpRequest` 对象的 `open()` 方法与服务端建立连接

- 构建请求所需的数据内容，并通过` XMLHttpRequest` 对象的 `send()` 方法发送给服务器端

- 通过 `XMLHttpRequest` 对象提供的 `readystatechange、loadend` 事件监听服务器端的通信状态

- 接受并处理服务端向客户端响应的数据结果
- 将处理结果更新到 `HTML`页面中

```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://example.com/data.json");
xhr.send();
xhr.onreadystatechange = function() {
  if(xhr.readyState == 4 ) {
      if(xhr.status >= 200 && xhr.status < 300){
    	var data = JSON.parse(xhr.responseText);
      }
  }
}
```

#### XHR Open方法

```js
xhr.open(method, url, [async][, user][, password])
```

**method请求方法**

| GET    | 获取数据       |
| ------ | -------------- |
| POST   | 数据提交       |
| PUT    | 修改数据(全部) |
| DELETE | 删除数据       |
| PATCH  | 修改数据(部分) |

#### onreadystatechange 状态

- 0：请求未初始化
- 1：服务器连接已建立
- 2：请求已接收
- 3：请求处理中
- 4：请求已完成，且响应已就绪

#### setRequestHeader 设置请求类型

```js
xhr.open("POST","/ajax/demo.php",true)
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
xhr.send()
```

#### Content-Type 类型

`application/json`：用于传输 JSON 格式的数据

`application/xml`：用于传输 XML 格式的数据

`text/plain`：纯文本格式，通常用于普通文本文件

`text/html`：用于传输 HTML 格式的数据

`image/jpeg, image/png, image/gif`：用于传输图像数据

`multipart/form-data`：通常用于**上传**文件，表单数据会被编码成一系列的部分

`application/x-www-form-urlencoded`：通常用于发送**表单**数据，数据会被编码为键值对的形式（表单默认的提交数据的格式）

#### 取消请求

```
xhr.abort()
```

