const fs = require('fs')
// 暗号：分治算法
module.exports.createLoader = config => {
    const loader = (scanFolder, cb) => {
        const files = fs.readdirSync(scanFolder);
        files.forEach(filename => {
            filename = filename.replace(".js", "");
            const file = require(scanFolder + "/" + filename);
            cb(filename, file);
        })
    }

    return {
        initFunction: scanFolder => {
            let ret = {}
            loader(scanFolder, (filename, file)=>{
                ret[filename] = file(config);
                
            })
            return ret
        }
    }
}

