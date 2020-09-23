const fs = require('fs');
const handlebars = require('handlebars')

const chalk = require('chalk')



module.exports = async () => {
  const list = 
    fs.readdirSync('./src/views')
      .filter(v => v !== 'Home.vue')
      .map(v => ({
        name: v.replace('.vue', '').toLowerCase(),
        file: v
      }))
}