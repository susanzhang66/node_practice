const {EventEmitter} = require('events')
// 暗号：搜索算法
module.exports = class Connection {
    constructor() {
        // this.conf = conf
        this.emmiter = new EventEmitter()
    }
    // 订阅
    onConn(fn){
        this.emmiter.on('message', function (text) {
            console.log(text)
            fn(text)
        })

    }
    // 触发
    connection(data){
        this.emmiter.emit('message', data)
    }
}
