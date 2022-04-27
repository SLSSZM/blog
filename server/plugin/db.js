module.exports = app => {
  const mongoose = require('mongoose');
  mongoose.connect(process.env.MONGODBURL || 'mongodb://localhost:27017/blog');
  // 需要引用模型，防止populate出现未model
  require('require-all')(__dirname + '/../models');
};
