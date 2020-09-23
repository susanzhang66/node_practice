#!/usr/bin/env node
const program = require('commander')
program.version(require('../package').version)
// 1. 下载git项目， 2. 安装依赖  3. 启动项目 run serve,并且打开浏览器。
program
    .command('init <name>')
    .description('init project')
    .action(
        require('../lib/init')
    )
// 根据.vue文件自动生成 router.js配置。以及app.vue里的link    
program
    .command('refresh')
    .description('refresh routers...')
    .action(require('../lib/refresh'))
    
// 监听文件变化 -- 自动重启项目
program
    .command('serve')
    .description('serve')
    .action(require('../lib/serve'))
program.parse(process.argv)