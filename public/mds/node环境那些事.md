### 使用nvm管理node版本
安装 

```javascript
npm install nvm
```

查看可用node版本

```html
nvm list available
```

查看已安装node版本 

```javascript
 nvm ls
```

查看当前版本

```html
nvm current
```

切换node版本

```javascript
nvm use 16.15.1
nvm use 18.20.2
```



### 镜像源
查看镜像源

```javascript
npm config get registry
```

切换镜像源

```javascript
npm config set registry=https://registry.npmmirror.com/
```

官方源：[https://registry.npmjs.org/](https://registry.npmjs.org/)

淘宝源：[https://registry.npmmirror.com/](https://registry.npmmirror.com/)

清华源：[https://mirrors.tuna.tsinghua.edu.cn/](https://mirrors.tuna.tsinghua.edu.cn/)

阿里云：[https://npm.aliyun.com/](https://npm.aliyun.com/)

中国科技大学：[https://mirrors.ustc.edu.cn/npm/](https://mirrors.ustc.edu.cn/npm/)



