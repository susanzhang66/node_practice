```javascript
//webhook.js
const http = require('http')
const createHandler = require('github-webhook-handler')
const handler = createHandler({
    path:'/docker_deploy',
    secret:'myHashSecret'
})
http.createServer((req,res) => {
    handler(req,res,err => {
        res.statusCode = 404
        res.end('no such location')
    })
}).listen(7777, () => {
    console.log('Webhook listen at 7777')
})
handler.on('error',err => {
    console.error('Error',err.message)
})
handler.on('*',event => {
    console.log('Received * ',event.payload)
})
```

#### 第二步，github上面新增 webhook 各项信息如下
# 新建一个webhooks Payload URL
http://www.josephxia.com:7777/docker_deploy
# Content type application/json
secret myHashSecret

#### 第三步  shell脚步
```javascript
function run_cmd(cmd, args, callback) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";
    child.stdout.on('data', function (buffer) { resp += buffer.toString(); });
    child.stdout.on('end', function () { callback(resp) });
}
handler.on('push', function (event) {
    console.log('Received a push event for %s to %s', event.payload.repository.name, event.payload.ref);
    // 分支判断
    if(event.payload.ref === 'refs/heads/master'){
         console.log('deploy master..')
         run_cmd('sh', ['./deploy-dev.sh'], function(text){ console.log(text) } );
    } 
})