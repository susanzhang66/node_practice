const koa = require('koa')
const app = new koa()
// 中间件  -- 本质是存储在内存中。 当用户量极大的时候，内存扛不住。 多台服务器的时候也会丢失。
// koa-session: 默认是存储在客户端的，base64序列化存储在 浏览器 -- https://juejin.im/post/6866982764256690189
const session = require('koa-session')

const redisStore = require('koa-redis')

const redis = require('redis')
const redisClient = redis.createClient(6379, 'localhost')

//本来是回调的方式的，然后通过下面的封装同步的写法，
const wrapper = require('co-redis')
const client = wrapper(redisClient)

// 加密密钥， 用来对cookie进行签名
app.keys = ['some secret']

// sessiond 的配置信息
const SESS_CONFIG = {
    key: 'kkb:sess', // key
    maxAge: 8640000,  // 有效期
    httpOnly: true,  // 服务器有效，true: js不可读取这个cookie,
    signed: true,  // 签名  -- 防篡改
    store: redisStore({client})  // // 默认存储在内存中，这个选项指定了redis
  
}


app.use(session( SESS_CONFIG, app))


app.use( ctx => {
  // 查看redis
  redisClient.keys('*', (err, keys) => {
    console.log('keys:',keys)
    keys.forEach(key => {
        redisClient.get(key, (err,val) => {
            console.log(val)
        })
    })
  })
  if(ctx.path === '/favicon.ico') return

  let n = ctx.session.count || 0
  ctx.session.count = ++n
  // koa的好处点。。
  ctx.body = '第' + n + '次访问'
})

app.listen(3000)

