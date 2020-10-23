/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1602757438251_1633';

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/egg_x',
    options: {
      // useMongoClient: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
    },
  }

  // add your middleware config here
  config.middleware = ['errorHandler'];
  // config.onerror = {
  //   // 这里也可以统一获取 错误点的地方
  // }
  // 自动生成文档，自动生成路由插件
  config.swaggerdoc = {
    dirScanner: './app/controller',
    // 文档的title
    apiInfo: {
      title: '开课吧接口',
      description: '开课吧接口 swagger-ui for egg',
      version: '1.0.0',
    },
    schemes: ['http', 'https'], // 提供的文档类型
    // 自动生成mock有关系
    consumes: ['application/json'],
    produces: ['application/json'],
    enableSecurity: false,
    // 接口自动校验
    // enableValidate: true,
    routerMap: true,  // routerMap 自动生成路由
    enable: true,
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
