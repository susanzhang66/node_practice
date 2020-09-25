const http = require('http')
const fs = require('fs');

const app = http.createServer((req, res) =>{
  const {method, url } = req;
  console.log('receive....', url, method)
  console.log('客户端的cookie....', req.headers.cookie)
  if(method == "GET" && url == '/'){
    fs.readFile("./index.html", (err, data)=> {
      res.setHeader('Content-Type', "text/html")
      res.end(data);
    })
  }else if(method == "GET" && url == "/api/users"){
    console.log('receive...', url)
    res.setHeader('Content-Type', "application/json");
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    // Credentials， 默认跨域网站是不能存储认证信息，如cookie,加入这个就可以加入
     res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Set-Cookie', 'cookie-ceshi=val;')
    res.end(JSON.stringify([{name: "tom", age: 20}]))

  }else if(method == "OPTIONS" && url == "/api/users"){
    console.log('option里面')
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
    // 这一行是 预检请求，解决 非正常报头信息
    res.writeHeader(200, {
    'Access-Control-Allow-Credentials':'true',   // 这里预检请求用
    // 'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Headers': 'X-Token,Content-Type',
    'Access-Control-Allow-Methods': 'PUT'
    })
    res.end();
  }else if(method === "POST" && url === "/api/save"){
    // body 部分是通过 流来传输的 --- 这部分可以通过中间件来实现

    // post 形式都要通过流的形式来接收
    // 接收数据的
      let reqData = [];
      // 数据的长度
      let size = 0;
      // 
      req.on('data', data => {
        reqData.push(data);
        size += data.length;
      })

      req.on('end', function(){
        const data = Buffer.concat(reqData, size);
        res.end(`formdata:${data.toString()}`)

        console.log('data:', size, data.toString())
      })
  }else if (method === "POST" && url === "/api/upload") {

   }
})


module.exports = app;


// 4000