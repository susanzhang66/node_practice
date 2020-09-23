const fs = require('fs');

// const data = fs.readFileSync('./download.js')
// // 这是buffer -- 二进制。
// console.log(data)

// console.log(data.toString());

// fs.readFile('./download.js', (err, data)=>{
//   if(err) throw err
//   console.log(data)
// })

const promisify = require('./promise/promisify')
const readFile = promisify(fs.readFile)

(async function(){
  const data = await readFile('./download.js')
  console.log(data);
})()
