const fs = require('fs')
module.exports.parser = path => {
    const readStream = fs.createReadStream(path)
    let reqData = [];
    let size = 0;
    return new Promise(resolve => {
        // 创建一个写入流
        // const fws = fs.createWriteStream('./test.json');
        readStream.on('data', (data) => {
            reqData.push(data);
            size += data.length;
            // fws.write(data);
            console.log(data, size)
        })
        readStream.on('end', () => {
            // fws.end();
        resolve(JSON.parse( reqData.toString() ) )
            // console.log(fws)
        })
    })
}
