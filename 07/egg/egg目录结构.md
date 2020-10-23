egg-project
├── package.json
├── app.js (可选)
├── agent.js (可选)
├── app
|   ├── router.js   // 路由
│   ├── controller   // 路由转发
│   |   └── home.js
│   ├── service (可选)  // 程序核心，逻辑的地方
│   |   └── user.js
│   ├── middleware (可选)  // 中间件， 也是要在config里面 写好配置。
│   |   └── response_time.js
│   ├── schedule (可选)   // 定时任务
│   |   └── my_task.js
│   ├── public (可选)  // 静态资源
│   |   └── reset.css
│   ├── view (可选)   // 模板放置的地方， 要在config里面写配置。
│   |   └── home.tpl
│   └── extend (可选)   // 扩展性
│       ├── helper.js (可选)  // 应该是扩展在app.helpler可以获取到。
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config
|   ├── plugin.js   // 插件配置的地方
|   ├── config.default.js  // 输出config配置信息供程序用
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js