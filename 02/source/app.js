const KKB = require('./k-koa')
const app = new KKB()
// const delay = () => Promise.resolve(resolve => setTimeout(() => resolve(), 2000));
// app.use(async (ctx, next) => {
//     ctx.body = "1";
//     // 这个打印不了，没用async await
//     setTimeout(() => {
//         ctx.body += "2";
//     }, 1000);
//     await next();
//     ctx.body += "3";
// });

// app.use(async (ctx, next) => {
//     ctx.body += "4";
//     await delay();
//     await next();
//     ctx.body += "5";
// });

// app.use(async (ctx, next) => {
//     ctx.body += "6";
// });


// 静态中间件
const static = require('./static')
app.use(static(__dirname + '/public'));


// 路由的使用

const Router = require('./router')
const router = new Router();

// 这里只使用了get，post  
router.get('/index', async ctx => { ctx.body = 'index page'} );

router.get('/post', async ctx => {ctx.body = 'post page'})

router.get('/list', async ctx => { ctx.body = 'list page'; });
router.post('/index', async ctx => { ctx.body = 'post page'; });

app.use( router.routes() );

app.listen(3001, ()=>{
  console.log('3001启动')
})