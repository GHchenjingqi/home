### 1.StrictMode 
自带的开发工具，开发模式下会检查组件（过时生命周期钩子及过时API），并发出警告和错误信息。生产环境不影响。

```jsx
import { StrictMode } from 'react'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### 2.createRoot 
是React18引入的新API，用于初始化 React 应用的根节点。新特性：并发渲染（优先处理优先级高的任务）、自动批处理（自动批处理状态更新）。

```javascript
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

### 3.useState 
是 React 提供的一个 Hook，用于在函数组件中添加状态（state）

```javascript
import { useState } from 'react'
// const [state-状态名, setState-更新修改状态方法] = useState(initialState-初始值|初始函数);
const [count, setCount] = useState(0);
// 更新状态，默认状态更新是异步的，值不会立即生效，如果依赖更新后的状态需要用useEffect。
setCount(prevCount => prevCount + 1)
// 多状态更新
const [user, setUser] = useState({ name: 'John', age: 30 });
setUser(prevUser => ({ ...prevUser, age: 31 }));
```

### 4.useEffect 
是 React 提供的一个 Hook，用于在函数组件中执行副作用操作（指那些与组件渲染无关的操作，例如数据获取、订阅、手动修改 DOM 等）。

useEffect 可以看作是类组件中 componentDidMount、componentDidUpdate 和 componentWillUnmount 的组合。

**useEffect(fn-副作用函数, 可选[dependencies]-依赖数组)  **

+ **依赖数组省略，每次渲染都会执行；**
+ **传入空数组，只会在组件挂载和卸载时执行；**
+ **传值后，有点类似vue监听watch/computed计算属性。**



```javascript
useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    // 清理定时器
    return () => clearInterval(timer);
}, []); // 空数组表示只在挂载和卸载时执行
```

![](https://cdn.nlark.com/yuque/0/2025/jpeg/1460947/1736933499247-647fd414-dda2-467e-bba6-ee8611d7b6db.jpeg)

#### useEffect 常见用途
a.数据获取 - 挂载时获取数据

```javascript
useEffect(() => {
  fetch('/api/data')
    .then(response => response.json())
    .then(data => setData(data));
}, []);
```

b.订阅事件 - 卸载时取消订阅

```javascript
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

c.手动修改Dom

```javascript
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]); // 在 count 变化时更新标题
```

### 5.React Router 
是React 生态中最流行的路由管理工具，实现单页面应用（SPA）中实现多页面的效果。

使用步骤：

1. 安装 react-router-dom 包

```shell
npm install react-router-dom
```

2. 路由配置

```jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/home";
import User from "./components/User";
import NoFound from "./components/NoFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/:id" element={<User />} />
      <Route path="*" element={<NoFound />} />
    </Routes>
  );
}

export default AppRoutes;
```

3. 路由使用

```jsx
// app.jsx
import { BrowserRouter ,Link} from 'react-router-dom'
import AppRoutes from './routes'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/about">About</Link> | 
        <Link to="/contact">Contact</Link> | 
        <Link to="/user/145">User 1</Link> | 
        <Link to="/login">Login</Link>
      </nav>
      <AppRoutes />
    </BrowserRouter>
  )
}
export default App
```



### jsx核心语法
#### 1.模版变量使用 - 单括号，元素属性值不加引号
```jsx
function Home() {
  const Home = "Home页面";
  const title = "首页";
  return (
    <h1 title={title}>{Home}</h1>
  );
}
```



#### 2.响应数据使用 - useState
```jsx
function Home() {
  const [change, setChange] = useState(false);
  const Home = "Home页面";
  const title = "首页";
  const handleClick = () => {
    setChange(!change);
  };
  return (
    <>
      <h1>{change ? Home : title  }</h1>
      <Button type="primary" onClick={handleClick}>Button</Button>
    </>
  );
}
```



#### 3.动态class
```jsx
function Home() {
  const [change, setChange] = useState(false);
  const Home = "Home页面";
  const handleClick = () => {
    setChange(!change);
  };
  return (
    <>
      <h1 className={change ? 'title' : ''}>{ Home }</h1>
      <Button type="primary" onClick={handleClick}>Button</Button>
    </>
  );
}
```

#### 4.动态style - 双括号{{}}
style接收一个css属性集合的对象，因此看起来就是双括号{{}}。

```jsx
function Home() {
  const [change, setChange] = useState(false);
  const Home = "Home页面";
  const handleClick = () => {
    setChange(!change);
  };
  return (
    <>
      <h1 style={{ background: change ? "green" : "blue" }}>{ Home }</h1>
      <Button type="primary" onClick={handleClick}>Button</Button>
    </>
  );
}
```

#### 5.条件渲染
```jsx
function Home() {
  const [change, setChange] = useState(false);
  const handleClick = () => {
    setChange(!change);
  };
  // 条件渲染，返回jsx
  const DivContent = ()=>{
    return change ? <div>这是一个div</div> : <p>这是文字</p>;
  };

  return (
    <>
      <DivContent />
      <Button type="primary" onClick={handleClick}>Button</Button>
    </>
  );
}
```

#### 6.对象渲染
```jsx
function Home() {
  const [data, setData] = useState({
    name: "张三",
    age: 18,
  });

  const handleAge = () => {
    setData({
      ...data,
      age: data.age + 1,
    });
  };
  return (
    <>
      <div>{data.name + data.age}岁</div>
      <Button type="primary" onClick={handleAge}>过年了，年龄+1</Button>
    </>
  );
}
```



#### 7.数组渲染 - map
```jsx
function Home() {
  const [list, setList] = useState([{ id:0 ,name: "张三", age: 18 },{ id:2 ,name: "李丽", age: 25 },{ id:4 ,name: "王五", age: 45 }]);

  const ListContent = ()=>{
    return list.map(item=>(
      <li key={item.id+ Math.random()}>{item.name},今年{item.age}岁了</li>
    ))
  }
  const handleClickType = (e) => {
    const type = e.currentTarget.dataset.type;
    if(type === '0'){
      setList([{ id: list.length+2 ,name: "赵六"+list.length+2, age: 25 },...list]);
    }
    if(type === '1'){
      setList([...list,{ id: list.length+2 ,name: "王七"+list.length+12, age: 25 }]);
    }
    if(type === '2'){
      setList(list.filter(item=>item.id !== 2));
    }
    if(type === '3'){
      setList(list.map(item=>{
        if(item.id == 2){
          return {...item,age: "36"}
        }else{
          return item;
        }
      }));
    }
  }
  return (
    <>
      <ListContent />
      <Button type="primary" data-type="0" onClick={handleClickType}>往前加</Button>
      <Button type="primary" data-type="1" onClick={handleClickType}>往后加</Button>
      <Button type="primary" data-type="2" onClick={handleClickType}>不显示ID为2的</Button>
      <Button type="primary" data-type="3" onClick={handleClickType}>修改ID为2的年龄为36</Button>
    </>
  );
}
```

数组遍历时，只允许返回一个根元素，如果多个可以用 "**<font style="color:#DF2A3F;"><></></font>**"，若需要在根元素上加属性，比如key，就需要使用"**<font style="color:#DF2A3F;">Fragment</font>**"。

```jsx
const ListContent = ()=>{
  return list.map(item=>(
    <Fragment key={item.id+ Math.random()}>
      <li>{item.name}，今年{item.age}岁了</li>
      <div>----------------------------</div>
    </Fragment>
  ))
}
```

#### 8.组件通信
##### 1.父传子 - props
+ 属性写到html标签上，就是子组件参数props的子属性，会被传递给子组件。
+ jsx写到组件内部，就会默认传递给子组件props的children属性，就形成了“插槽”。
+ 父传子的属性都是只读的！！！

```jsx
function Home() {
  const ListItem = ({title,content, children})=>{
    return (
      <div className="card">
        <h3>{title}</h3>
        <p>{content}</p>
        {children}
      </div>
    )
  }
  return (
    <>
      <ListItem title="标题1" content="内容1" />
      <ListItem title="标题2" content="内容2" />
      <ListItem title="标题3" content="内容3" >
        <div className="slot">这是一个默认插槽</div>
      </ListItem>
    </>
  );
}
```

加上css效果如下:

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1737620261986-b8e77570-fd99-4e15-81db-c87dda3efa5f.png)

**具名插槽，通过属性传递的方式传输jsx，组件接收时，需要设置默认值（不然报错）。**

```jsx
function Home() {
  const ListItem = ({title,content,footer=<></>, children})=>{
    return (
      <div className="card">
        <h3>{title}</h3>
        <p>{content}</p>
        {children}
        {footer}
      </div>
    )
  }
  return (
    <>
      <ListItem title="标题1" content="内容1" footer={<div className="list-footer">具名插槽1</div>} />
      <ListItem title="标题2" content="内容2" footer={<div className="list-footer">具名插槽2</div>} />
      <ListItem title="标题3" content="内容3" >
        <div className="slot">这是一个默认插槽</div>
      </ListItem>
    </>
  );
}
```

加上css效果如下：

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1737620948468-32ff1cd5-f5bf-4b60-9d16-11c37a406e39.png)

##### 2.子传父 - 子调用父方法传递参数
父组件接收，通过props属性接收一个，函数参数就是子组件传递的值。

```jsx
function Home() {
  const Child = ({onActive})=>{
    const hanldeClick = ()=>{
      onActive('父组件，你好。我是子组件传参！');
    }
    return <Button onClick={hanldeClick}>子组件按钮</Button>
  }

  return (
    <Child onActive={(msg)=>{ alert(msg)}} />
  );
}
```

##### 3.组件之间：父组件传递数据
子组件共享父组件数据，组件A修改，组件B使用。

```jsx
function Parent() {
  const [data, setData] = useState('');

  const handleDataChange = (newData) => {
    setData(newData);
  };

  return (
    <div>
      <ChildA onDataChange={handleDataChange} />
      <ChildB data={data} />
    </div>
  );
}
// 修改
function ChildA({ onDataChange }) {
  const handleClick = () => {
    onDataChange('Data from ChildA');
  };

  return (
    <div>
      <button onClick={handleClick}>Send Data to ChildB</button>
    </div>
  );
}
// 使用
function ChildB({ data }) {
  return (
    <div>
      <p>Data from ChildA: {data}</p>
    </div>
  );
}
```

##### 4.组件之间：Context API 数据共享
```jsx
import React, { createContext, useState } from 'react';
const DataContext = createContext();

function Parent() {
  const [data, setData] = useState('');

  return (
    <DataContext.Provider value={{ data, setData }}>
      <ChildA />
      <ChildB />
    </DataContext.Provider>
  );
}

function ChildA() {
  const { setData } = React.useContext(DataContext);
  const handleClick = () => {
    setData('Data from ChildA');
  };

  return (
    <div>
      <button onClick={handleClick}>Send Data to ChildB</button>
    </div>
  );
}

function ChildB() {
  const { data } = React.useContext(DataContext);
  return (
    <div>
      <p>Data from ChildA: {data}</p>
    </div>
  );
}
export default Parent;
```

复杂的场景推荐方法：状态管理库（如 Redux、MobX）、事件总线（Event Bus）。

### 常用Hooks 
#### 1.useReducer  状态管理工具
<font style="color:rgb(64, 64, 64);">状态逻辑简单，优先使用 </font>`<font style="color:rgb(64, 64, 64);">useState</font>`<font style="color:rgb(64, 64, 64);">；如果状态逻辑复杂，优先使用 </font>`<font style="color:rgb(64, 64, 64);">useReducer</font>`<font style="color:rgb(64, 64, 64);">。</font>

```jsx
import React, { useReducer } from 'react';

function couterReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'sub':
      return state - 1;
    default:
      return state;
  }
}

export default function About() {
  //  [状态key, 状态修改方法] = useReducer(代理函数，默认值)
  const [couter, dispatch] = useReducer(couterReducer, 0);
  const handleClickAdd = () => {
    dispatch({ type: 'add' });
  };

  const handleClickSub = () => {
    dispatch({ type: 'sub' });
  }
  return (
    <>
      <h1>{couter}</h1>
      <Button type="primary" onClick={handleClickAdd}>加1</Button>
      <Button type="primary" onClick={handleClickSub}>减1</Button>
    </>
  );
}
```

#### 2.useRef
useRef 是 React 中的一个 Hook，用于创建一个可变的引用对象（ref），该对象在整个组件生命周期内保持不变。

与 useState 不同，**<font style="color:#DF2A3F;">useRef 的值变化不会触发组件重新渲染</font>**，因此它非常<font style="color:#000000;">适合存储不需要影响 DOM 渲染的值或直接操作 DOM 元素</font>。

```jsx
import React, { useRef } from 'react';
export default function About() {
const refObj = useRef({name:'化学'});
return (
    <Button type="primary" onClick={()=>{refObj.current.name = "历史"; alert(refObj.current.name );}}>修改name</Button>
 );
}
```

+ useRef操作dom

```jsx
import React, { useRef } from 'react';
export default function About() {
const refDom = useRef(null);
const changebox = () => {
    refDom.current.style.background = 'blue';
}
return (
  <>
  <h3>useRef操作dom</h3>
  <div ref={refDom} style={{background: 'red', width: '100px', height: '100px', marginBottom:'10px'}}></div>
  <Button type="primary" onClick={changebox}>变蓝色</Button>
  </>
  );
}
```



### 其他问题
#### 1. html元素多属性如何合并？为什么alt属性不能使用展开？
```jsx
function Home() {
  const Home = "Home页面";
  const title = "首页";

  const [change, setChange] = useState(false);
  const handleClick = () => {
    setChange(!change);
  };

  // 多个属性
  const h1obj = {
    title: title,
    style: { background: change ? "green" : "blue" },
    className: change ? 'title' : ''
  }
  return (
    <>
      <h1 title={title} style={{ background: change ? "green" : "blue" }} className={change ? 'title' : ''}>{change ? Home : title}</h1>
      <h1 {...h1obj}>{change ? Home : title}</h1>
      <Button type="primary" onClick={handleClick}>切换状态</Button>
    </>
  );
}
```

alt属性是img标签的图片秒速，如果缺失会有报错。



##### 












