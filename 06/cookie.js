const http = require('http');

// 用于保持ssession信息， seesion是通过sidValue作为key存储的
const session = {}

http.createServer((req, res)=>{
  // cookie 的key值
  const sessionKey = 'sid'

  if(req.url === '/favicon.ico'){
    return;
  }else{
    const cookie = req.headers.cookie
    // 服务器有这个 seesion, 代表已经登录了。
    if( cookie && cookie.indexOf( sessionKey ) > -1){
      res.end( 'come back ')
      console.log('cookie:', req.headers.cookie)
      // 匹配sid的cookie信息
      const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
      const sidValue = pattern.exec(cookie)[1]
      console.log('session:', sidValue, session, session[sidValue])
    }else{
      // 未登录
      const sidValue = (Math.random() * 9999999).toFixed()
      res.setHeader('Set-Cookie', `${sessionKey}=${sidValue}`)
      session[sidValue] = {name: 'laowang'}
      res.end('hello cookie')
    }
  }


}).listen(3000)