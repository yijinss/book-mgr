// 每一个文件都是模块
const Koa = require('koa');
const app = new Koa();

// 开启一个 http 服务
// 接受 http 请求 并作处理,处理完后响应
app.listen(3000, () => {
  console.log('启动');
});