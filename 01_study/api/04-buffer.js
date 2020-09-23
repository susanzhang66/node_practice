// 创建一个长度为10字节以0填充的Buffer
// Buffer: 处理二进制的 缓冲区
const buf1 = Buffer.alloc(10);
console.log(buf1)


// 输出buffer acciima 61
const buf2 = Buffer.from('a');
console.log(buf2)

// 处理中文：  16进制的 字节
const buf3 = Buffer.from('中文');
console.log(buf3)


const buf4 = Buffer.concat([buf2, buf3]);
