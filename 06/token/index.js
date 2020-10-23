const Koa = require('koa');
const router = require('koa-router')()
const static = require('koa-static')
// 把请求流变成 json格式。
const bodyParser = require('koa-bodyparser')

const jwt = require('jsonwebtoken')
// koa-jwt用于验证-- 解密传回来的token是否有效，是否被篡改
const jwtAuth = require('koa-jwt')


const app = new Koa();

const secret = 'it is a secret';

app.use(static(__dirname + '/'))
app.use(bodyParser())

router.post('/login-token', async ctx => {
  const { body } = ctx.request;
  const userinfo = body.username;
  ctx.body = {
    message: "登录成功",
    user: userinfo,
    // 生成 token 返回给客户端，  
    token: jwt.sign(
      // 第一个参数， 用于token加密的 payload
      {
        // 实际用acountId返回即可，避免敏感信息存储客户端
        data:userinfo,
        // 设置 token 过期时间，一小时后，秒为单位
        exp:Math.floor(Date.now() /1000) + 60 * 60
      },
      secret
    )
  }
})


// 先解密，看下是否成功，再进入程序。
router.get("/getUser-token", jwtAuth({secret}), async ctx => {
  // 验证通过{}
  ctx.body = {
    message: "获取数据成功",
    // 这里 todo。。。。为啥，是从state.user.data里面取？？？
    userinfo: ctx.state.user.data
  }
})


app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3000)