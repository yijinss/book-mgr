const mongoose = require('mongoose')

// 1. 给那个数据库
// 哪个集合
// 添加什么格式的文档

// Schema
// Modal 是根据Schema生成的一套方法集合,这套方法用来操作集合和集合下的文档


const UserSchema = new mongoose.Schema({
  nickname: String,
  password: String,
  age: Number,
});

const UserModal = mongoose.model("User", UserSchema);

const connent = () => {
  // 去连接数据库
  mongoose.connect('mongodb://127.0.0.1:27017/book-mgr');
  // 连接成功时，做一些事情
  mongoose.connection.on('open', () => {
    console.log('连接成功');
    
    // 创建文档
    const user = new UserModal({
      nickname: '小明',
      password: '123123',
      age: 21
    });

    // 储存数据
    user.save();

  })
}

connent()