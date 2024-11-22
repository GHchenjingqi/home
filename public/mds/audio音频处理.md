###  音频文件转为二进制文件
<font style="color:rgb(143, 143, 143);"> 二进制格式：Int8Array、Uint8Array、Int16Array、Int32Array</font>

```javascript
fetch('0002.wav')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => {
    // 创建Blob对象
    const blob = new Blob([arrayBuffer], { type: 'audio/wav' });

    // 创建一个FileReader实例
    const reader = new FileReader();

    // 文件读取成功完成后的处理
    reader.onload = function(event) {
      // event.target.result 包含了二进制的数据
      console.log(event.target.result);
    };

    // 以二进制形式读取Blob
    reader.readAsArrayBuffer(blob);
});
```

