// 测试 promisify.js

function fun(arg, callback) {
  try {
      // aaa()
      callback(null, 'result')
  } catch (error) {
      callback(error)
  }
  // console.log('fs ' + arg)
}

// 回调方式
fun('./index1.js', (err, data) => {
  console.log(err ? 'read err' : data)
})

// promise方式
const promisify = require('./promisify')
// const { promisify } = require('util')
const promise = promisify(fun)

// await方式
setTimeout(async () => {
  try {
      // 这里执行就会 执行 fun,然后 fun里面的callback,就是
      await promise('./abc.txt')
  } catch (error) {
      console.log('catch err', error)
  }
})