/**
 * repo :git地址
 * desc : 项目名称
 */
module.exports.clone = async function clone(repo, desc){
  // 同步的写法工具函数
  const {promisify} = require('util');
  // 变成同步的写法
  const download = promisify(require('download-git-repo'));

  const ora = require('ora');
  const process = ora(`正在下载。。。${repo}`);
  process.start();
  try {
    // desc 是下载的路径
    await download(repo,desc)
  }catch(error){
    process.fail()
  }
  process.succeed();
}