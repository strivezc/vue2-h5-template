// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-plugin-px2rem":{
      rootValue: 100, //换算基数
      unitPrecision: 2, //允许REM单位增长到的十进制数字。
      // "propBlackList":['font'], //黑名单
      exclude: /(node_module)/,//默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
    }
  }
}
