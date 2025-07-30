### CSS 单位
1. PX 像素，绝对单位，浏览器物理像素单位
2. %  相对单位，默认相对父元素;如果父级没有设置，就相对根子号，甚至浏览器的默认大小
3. rem  相对单位，相对于根字号，默认 1rem = 16px，假如修改了根字号 1rem = 根字号
4. em 相对单位，默认相对父元素的font-size，1em = 父元素的字号
5. vw  将视口宽度分成了100份  1vw = 视宽 / 100
6. vh  将视口高度分层了100份 1vh = 视高 / 100
7. vmin 视口最短边的长度
8. vmax 视口最长边的长度
9. rpx 是小程序常用的相对单位(小程序规定屏幕宽度 750rpx)，默认屏宽按照iPhone6( 物理宽度375px)，dpr:2   100vw = 750rpx = 375px   , 相当于 1rpx = 0.5px

### CSS 溢出隐藏
```css
.text-h1 {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
}
.text-h2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical
}
.text-h3 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical
}
```

### CSS 滚动轴样式
```css
/* 通用滚动条美化方案 */
::-webkit-scrollbar {
  width: 12px;  /* 垂直滚动条宽度 */
  height: 12px; /* 水平滚动条高度 */
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  border-radius: 10px;
  border: 3px solid #f1f1f1;
  transition: all 0.3s ease;
}

/* 悬停效果 */
::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #ff5252, #ff7675);
  transform: scale(1.05);
}
```

### CSS 鼠标穿透事件
```css
.pointer-none{
  pointer-events:none
}
```

### CSS 文本禁止选择
```css
.sel-no{
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
```

### CSS 变量修改
```css
body{
  --color:red;
}

// js
document.body.style.setProperty('--color', "blue")
```

### CSS 毛玻璃
```css
.glass-card{
  background: rgba(255, 255, 255, 0.5); /* 半透明背景 */
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px); /* 毛玻璃核心 */
  -webkit-backdrop-filter: blur(10px); /* Safari 兼容 */
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: white;
}
```

### CSS鼠标指针样式修改
```css
#app{
  cursor: url('@/assets/icons/cursor.svg'), pointer;
}
```

