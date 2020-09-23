module.exports = function promisify(fn) {
  return function (...args) {  // promise
      return new Promise(function (resolve,reject) {
          args.push(function (err,...arg) {
            //   这个函数什么时候执行？ 就是fn的callback(),
              if(err){
                  reject(err)  
              }else{
                  resolve(...arg);
              }
          });
          fn.apply(null, args);
      })
  }
}


// const fs = require('fs');

// const readFile = promisify(fs.readFile)

// (async function(){
//   const data = await readFile('./download.js')
//   console.log(data);
// })()

