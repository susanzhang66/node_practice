const fs = require('fs')
// 类似于用数据去填充数据
const handlebars = require('handlebars')
const chalk = require('chalk')

// 根据.vue文件自动生成 router.js配置。以及app.vue里的link
module.exports = async () => {
    // 获取页面列表
    const list =
        fs.readdirSync('./src/views')
            .filter(v => v !== 'Home.vue')
            .map(v => ({
                name: v.replace('.vue', '').toLowerCase(),
                file: v
            }))
    compile({
        list
    }, './src/router.js', './template/router.js.hbs')

    // 生成菜单
    compile({
        list
    }, './src/App.vue', './template/App.vue.hbs')



    /**
     * 
     * @param {*} meta 
     * @param {*} filePath 
     * @param {*} templatePath 
     */
    function compile(meta, filePath, templatePath) {
        if (fs.existsSync(templatePath)) {
            // 读取模版内容
            const content = fs.readFileSync(templatePath).toString()
            // 用数据meta填充 模板content
            const reslut = handlebars.compile(content)(meta)
            // 将填充好的模板 重新写入 filePath
            fs.writeFileSync(filePath, reslut)
        }
        console.log(chalk.red(`🚀${filePath} 创建成功`))
    }


}