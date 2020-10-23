定制NodeJS镜像

 // package.json
 ```json
{
  "name": "myappp",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "myappp",
  "dependencies": {
    "koa": "^2.7.0"
  }
}
```

```javascript

 // app.js
const Koa = require('koa')
const app = new Koa()
app.use(ctx => {
    ctx.body = 'Hello Docker'
})
app.listen(3000, () => {
    console.log('app started at http://localhost:3000/')
})
```

# Dockerfile
# 制定node镜像的版本
FROM node:10-alpine 
# 移动当前目录下面的文件到app目录下  进入到app目录下面，类似cd WORKDIR /app
ADD . /app/ 
# 安装依赖
RUN npm install
# 对外暴露的端口
EXPOSE 3000
# 程序启动脚本
CMD ["node", "app.js"]


# 定制镜像
docker build -t mynode .
# 运行
docker run -p 3000:3000 -d mynode