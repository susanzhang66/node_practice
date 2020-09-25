const Koa = require('Koa')
// 用于接收 post请求，body部分流接收的原理
const bodyParser = require('koa-bodyparser')
const app = new Koa();

//bodyparser的返回： body { abc: '123', abc2: '123' }
//自定义中间件的返回： body abc=123&abc2=123
// app.use(bodyParser())
app.use(require('koa-static')(__dirname + '/'));

const router = require('koa-router')()

// 自定义中间件
app.use(async (ctx, next) => {
  console.log('body-parser...')
  const req = ctx.request.req;
  // 经测试，下面这一句也是可行的。 参考02课原理
  // const req = ctx.req;
  let reqData = [];
  let size = 0;
  
  await new Promise(( resolve ) => {
    req.on('data', data => {
      reqData.push(data);
      size += data.length;
    })
    req.on('end', function(){
      console.log('end')
      // 把流转换成buffer,  这种不应该是耗内存么。速度快呀。
      const data = Buffer.concat(reqData, size);
      console.log('data', size, data.toString())
      ctx.request.body = data.toString();
      resolve()
    })
  })
  await next();
})

router.post('/add', async (ctx, next) => {
  console.log('body', ctx.request.body)
  ctx.body = ctx.request.body
  next()
})

app.use(router.routes())

app.listen(3000)



// Promise.resolve(x) 
// 上面的写法等价于 
// new Promise(resolve => { resolve(x)})