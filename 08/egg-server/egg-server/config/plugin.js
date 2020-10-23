'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 自动生成 接口文档。
  swaggerdoc : {
    enable: true,
    package: 'egg-swagger-doc-feat',
  },
  // 校验
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  mongoose : {
    enable: true,
    package: 'egg-mongoose',
  },
};
