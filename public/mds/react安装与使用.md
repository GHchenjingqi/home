## 一、安装篇
1.安装node, 建议v16.15+

2.全局安装react脚手架create-react-app

```html
npm install -g create-react-app
```

3.创建项目

```html
create-react-app my-app
```

4.启动项目

```html
npm start
```



## 二、入门篇
+ **react使用的jsx语法（简单理解：函数返回html代码块）**
+ **react引入css及图片静态资源 需要开头import导入**
+ **定义组件可以使用定义函数方法，返回jsx内容，但需要使用“()”包括返回jsx内容**
+ **组件传参、接收都需要用 {} 进行多包括一层，{number},{true},{[1,2,3]},{{name:''}}**
+ **动态style，也需要用 {} 进行多包括一层，{{'color':'red'}}**
+ **组件内动态生成列表使用map循环**
+ **组件动态绑定参数 使用{}**
+ **条件渲染使用 if判断，或三元运算**
+ **响应事件使用 onclick={handle} 来绑定，事件不需要加(),如果这样写handle()会渲染后立即执行**
+ **响应数据定义时，useState 必须在组件或函数内使用，不能放到顶层（同import同级）**
+ **div 的class需要使用className替换**
+ **组件内多个子元素可以使用 “<></> ”包括，就不会报错了**
+ **多层次组件嵌套，组件可以作为参数进行传递**



案例：

```javascript
import logo from './logo.svg';
// 引入页面css 及静态资源
import './App.css';
// 响应数据引入
import { useState } from 'react';

// 自定义组件及组件传参 需要用{}在传递和接收时包括，否则会报错
function Buttons({params}){
  // useState 必须在组件或函数内使用
  // count 是响应数据，setCount 是响应数据的修改函数
  const [count,setCount] = useState(0);

  const handle = (e) => {
    console.log(e.target.innerText)
    // 修改数据使用setCount，不能直接赋值修改
    setCount( count + Number(e.target.innerText) )
  }
  let buttons = [...params]

  const btns = buttons.map((button, index) => <button onClick={handle} style={{'color': index%2===0 ? "red" : "blue"}} key={index}>{button}</button>)

  return(
    <>
      <div>
        <p>{count}</p>
      </div>
      <div className='btnGroup'>
          { btns }
      </div>
    </>
  )
}
function App() {
  return (
    <div className="App">
    <header className="App-header">
    <img src={ logo } className="App-logo" alt="logo" />
    <Buttons params={["1", "2", "3", "4", "5"]} />
    </header>
    </div>
  );
}

export default App;
```



+ 组件状态管理 useState 

状态可以随意命名，但setter函数必须是set+状态名，如：

```javascript
import { useState } from 'react';
const [something, setSomething] = useState(0) | useState(false)
```

+ 组件更新过程：触发-渲染-提交（浏览器绘制）

重新渲染：重新调用组件函数  ->  函数返回新的jsx快照 -> 更新页面











