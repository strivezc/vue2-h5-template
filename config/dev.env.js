'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

// 获取NODE_ENV参数
const env = process.env.NODE_ENV

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  API_ROOT:env==='development'?'"https://dev.talk915.com"':'"http://10.204.42.157:9090"',
  // API_ROOT: '"/api"',
  BACKGROUND_APPLICATION_URL:'"https://test.talk915.com"' ,
})
