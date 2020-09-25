var express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()

app.use(express.static(__dirname + '/'))

// 注意； createProxyMiddleware代理不生效
app.use('/api', createProxyMiddleware({target: 'http://localhost:4000'}))

module.exports = app;

// 3000

