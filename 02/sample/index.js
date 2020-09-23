const Koa = require('koa')
const app = new Koa()
// 切面的写法。
app.use(async (ctx, next)=>{
  const start = new Date().getTime()
  console.log(`start: ${ctx.url}`);
  await next();
  const end = new Date().getTime();
  console.log(`请求${ctx.url},耗时${parseInt(end-start)}ms`)
})

app.use((ctx, next) => {
  const exprie = Date.now()+100;
  while(Date.now() < exprie)
    ctx.body = 
        {
            name: 'tom'
        }
    
    next()
})



app.listen(3000,()=>{
  console.log('server run 3000')
})