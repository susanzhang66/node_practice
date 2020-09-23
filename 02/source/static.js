// 静态服务 中间件
// static.js  -- 静态服务？
const fs = require("fs");
const path = require("path");

module.exports = (dirPath = "./public") => {
  return async (ctx, next) => {
    if (ctx.url.indexOf("/public") === 0) {
      // public开头 读取文件
      const url = path.resolve(__dirname, dirPath);
      const fileBaseName = path.basename(url);
      const filepath = url + ctx.url.replace("/public", "");
      // console.log(filepath);
      // console.log(ctx.url,url, filepath, fileBaseName)
      try {
        stats = fs.statSync(filepath);
        // 如果是目录
        if (stats.isDirectory()) {
          const dir = fs.readdirSync(filepath);
          // const
          const ret = ['<div style="padding-left:20px">'];
          dir.forEach(filename => {
            console.log('wo d wenjianming:  '+filename);
            // 简单认为不带小数点的格式，就是文件夹，实际应该用statSync
            if (filename.indexOf(".") > -1) {
              ret.push(
                `<p><a style="color:black" href="${
                  ctx.url
                }/${filename}">${filename}</a></p>`
              );
            } else {
              // 文件
              console.log('wo zai zhe ')
              ret.push(
                `<p><a href="${ctx.url}/${filename}">${filename}</a></p>`
              );
            }
          });
          ret.push("</div>");
          ctx.body = ret.join("");
        
        } else {
          // 直接输出文件内容
          console.log("文件");
          // 读取文件 不是流的形式哟
          const content = fs.readFileSync(filepath);
          ctx.body = content;
        }
      } catch (e) {
        // 报错了 文件不存在
        ctx.body = "404, not found";
      }
    } else {
      // 否则不是静态资源，直接去下一个中间件
      await next();
    }
  };
};