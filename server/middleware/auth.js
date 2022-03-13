const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');
const assert = require('http-assert');
const redis = require('../plugin/redis');

module.exports = app => {
  return async (req, res, next) => {
    const token = String(req.headers.authorization || '')
      ?.split(' ')
      ?.pop();
    assert(token, 401, '请重新登录');
    try {
      const { _id } = await jwt.verify(token, req.app.get('secret'));
      assert(_id, 401, '请重新登录');
      const userToken = await redis.get(_id);
      assert(userToken === token, 401, '请重新登录');
      req.user = await AdminUser.findById(_id);
      assert(req.user, 401, '请重新登录');
      next();
      return;
    } catch (err) {
      if (err.name == 'TokenExpiredError') {
        const authTokenData = await redis.hGetAll(token);
        assert(authTokenData._id, 401, '请重新登录');

        const userToken = await redis.get(authTokenData._id);
        assert(userToken === token, 401, '请重新登录');
        await redis.multi().del(token).del(authTokenData._id).exec();

        req.user = await AdminUser.findById(authTokenData._id);
        const newToken = jwt.sign(authTokenData, app.get('secret'), { expiresIn: 60 * 30 });
        await redis
          .multi()
          .hSet(newToken, authTokenData)
          .expire(newToken, 3600 * 24 * 30)
          .set(authTokenData._id, newToken, { EX: 3600 * 24 * 30 })
          .exec();
        req.token = newToken;
        next();
        return;
      }
      assert(false, 401, '请重新登录');
    }
  };
};
