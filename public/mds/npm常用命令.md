查看镜像源

```
npm config get registry
```

查看config信息

```
npm config list
```

切换镜像源

```
npm config set registry http://registry.cnpmjs.org
npm config set registry http://registry.npm.taobao.org
// 推荐
npm config set registry https://registry.npmmirror.com
```

清理代理

```
npm config rm proxy
npm config rm https-proxy
```

清理缓存

```
npm cache clean --force
```

取消ssl验证

```
npm config set strict-ssl false
```

npm异常可以切换至cnpm或yarn

```
npm install cnpm -g
```

