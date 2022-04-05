const assert = require('http-assert');
const AdminUser = require('../models/AdminUser.js');

module.exports = app => {
  return async (req, res, next) => {
    const _id = req.headers.user;
    assert(_id && _id !== 'undefined', 400, '系统错误');
    req.user = await AdminUser.findById(_id);
    assert(req.user, 400, '系统错误');
    next();
  };
};
