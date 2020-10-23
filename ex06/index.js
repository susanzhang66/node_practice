const crypto = require('crypto')
// const { decode } = require('js-base64')
//暗号：贪心算法
module.exports.createToken = token => {
    const ary = token.split('.')
    if (ary.length !== 3) {
        return
    }

    return {
        // 获取时间
        getExp: () => {
            let t =Buffer.from(ary[1], 'base64').toString();
            t = JSON.parse(t);
            // console.log(t);
            return t.exp;
        },

        verify: key => {
            const hmac = crypto.createHmac('SHA256', key).update(ary[0]+ '.' +  ary[1]).digest('base64');
            return hmac === ary[2] + '='
            
        }
    }
}
