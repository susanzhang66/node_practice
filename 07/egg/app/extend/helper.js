// 编写扩展。
const moment = require('moment');
exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();