const Router = require('@koa/router');
const mongoose  = require('mongoose');
// const { getBody } = require('../../helpers/utils')
const config = require('../../project.config');

const User = mongoose.model('User');

const router = new Router({
  prefix: '/user',
});

router.get('/list', async (ctx) => {
  let {
    page,
    size,
    keyword,
  } = ctx.query;

  page = Number(page);
  size = Number(size);

  const query = {};

  if (keyword) {
    query.account = keyword;
  }

  const list = await User
    .find(query)
    .sort({
      _id: -1,
    })
    .skip((page-1)*size)
    .limit(size)
    .exec();

  const total = await User.countDocuments().exec();

  ctx.body = {
    msg: '获取列表成功',
    data: {
      page,
      size,
      list,
      total,
    },
    code: 1,
  }

});

router.delete('/:id', async (ctx) => {
  const {
    id,
  } = ctx.params;

  const delMsg = await User.deleteOne({
    _id: id,
  });

  ctx.body = {
    data: delMsg,
    code: '1',
    msg: '删除成功', 
  };
});

router.post('/add', async (ctx) => {
  const {
    account,
    password,
  } = ctx.request.body;

  const user = new User({
    account,
    password: password || '123123',
  });

  const res = await user.save();

  ctx.body = {
    code: 1,
    data: res,
    msg: '添加成功',
  }

});

router.post('/reset/password', async (ctx) => {
  const {
    id,
  } = ctx.request.body;
  
  const user = await User.findOne({
    _id: id,
  }).exec();
  console.log(user);

  if (!user) {
    ctx.body = {
      code: 0,
      msg: '没有找到用户',
    }
    return;
  }

  user.password = config.DEFAULT_PASSWORD;

  const res = await user.save()

  ctx.body = {
    code: 1,
    data: {
      account: res.account,
      _id: res._id,
    },
    msg: '重置成功',
  }

});





module.exports = router;