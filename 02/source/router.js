// 路由就是 策略模式的使用
class Router{
  constructor(){
    this.stack = [];
  }
  register(path, methods, middleware){
    let route = {path, methods, middleware}
    this.stack.push(route);
  }
  get(path, middleware){
    this.register(path, 'get', middleware);
  }
  post(path, middleware){
    this.register(path, 'post', middleware);
  }
  // 中间件使用
  routes(){
    let stock = this.stack;
    return async function(ctx, next){
      let currentPath = ctx.url;
      let route;
      for(let i = 0; i< stock.length; i++){
        let item = stock[i];
        if(currentPath === item.path && item.methods.indexOf(ctx.method) >= 0){
          route = item.middleware;
          break;
        }
      }
      if (typeof route === 'function') {
        route(ctx, next);
        return;
      }

      await next();
    }
  }
  
}

module.exports = Router;