const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')  // 清屏
const chalk = require('chalk')  //粉笔
// 下载git
const {clone} = require('./download')

//开启子线程
const spawn = async (...args) => {
  const {spawn} = require('child_process')
  return new Promise(resolve => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', ()=>{
      resolve()
    })
  })
}

const log = content => console.log( chalk.green( content))

module.exports = async name => {
  clear();
  const data = await figlet('kkb welcome')
  log(data)

  log(`创建项目${name}`)
  //克隆代码

  await clone('github:su37josephxia/vue-template', name)
  log('安装依赖')
  await spawn('cnpm', ['install'], {cwd: `./${name}`})
  log(`
  👌安装完成：
To get Start:
===========================
    cd ${name}
    npm run serve
===========================
  `)
}