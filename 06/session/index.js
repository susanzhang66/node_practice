const Koa = require('koa');
const router = require('koa-router')()
const session = require('koa-session')

const cors = require('koa2-cors')

const bodyParser = require('koa-bodyparser');
const static = require('koa-static')
const app = new Koa()

//配置session的中间件, 实现跨域请求
app.use(cors({
  credentials: true
}))

// app.use(cors({
//   origin: function (ctx) {
//       if (ctx.url === '/test') {
//           return "*"; // 允许来自所有域名请求
//       }
//       return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
//   },
//   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//   maxAge: 5,
//   credentials: true,
//   allowMethods: ['GET', 'POST', 'DELETE'],
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }))

app.keys = ['some secret'];

app.use(static(__dirname + '/'));
app.use(bodyParser())
app.use(session(app));

// 拦截登录态
app.use((ctx, next) => {
  if(ctx.url.indexOf('login') > -1){
    next()
  }else{
    if( !ctx.session.userinfo ){
      ctx.body = {
        message:"登录失败"
      }
    }else{
      next()
    }
  }
})

// 登录后，设置session
router.post('/login', async ctx => {
  const {
    body
  } = ctx.request
  // 设置session
  ctx.session.userinfo = body.username;
  ctx.body = {
    message: "登录成功"
  }
})

router.post('/logout', async ctx => {
  delete ctx.session.userinfo
  ctx.body = {
    message: "登出系统"
  }
})

router.get('/getUser', async ctx => {
  ctx.body = {
    message: "获取数据成功",
    userinfo: ctx.session.userinfo
  }
})


app.use(router.routes())
// allowedMethods这个是啥意思？
// 从源码中我们可以看到.allowedMethods处理的业务是当所有路由中间件执行完成之后,
// 若ctx.status为空或者404的时候,丰富response对象的header头.
// https://www.jianshu.com/p/fef91266a44c?from=singlemessage
app.use(router.allowedMethods());
app.listen(3000)


