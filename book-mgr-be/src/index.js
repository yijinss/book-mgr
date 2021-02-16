// 每一个文件都是模块
const Koa = require('koa');
const { connect } = require("./db");
const registerRouter = require('./routers');
const koaBody = require('koa-body');
const Body = require('koa-body');
const cors = require('@koa/cors');

const app = new Koa();

connect().then(() => {
  app.use(koaBody());
  app.use(cors());
  registerRouter(app);

  // 开启一个 http 服务 
  // 接受 http 请求 并作处理,处理完后响应
  app.listen(3000, () => {
    console.log('启动成功');
  });
});


