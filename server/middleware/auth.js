const jwt = require('jsonwebtoken')
const AdminUser = require('../models/AdminUser')
const assert = require('http-assert')
const redis = require('../plugin/redis')

const noAuth = ['login']
module.exports = app => {
  return async (req, res, next) => {
    // 处理无需验证的接口
    for (const i of noAuth) {
      const reg = new RegExp(i, 'i')
      if (reg.test(req.originalUrl)) {
        next()
        return
      }
    }
    const token = String(req.headers.authorization || '')?.split(' ')?.pop()
    assert(token, 401, '请重新登录')
    try {
      const { _id } = await jwt.verify(token, req.app.get('secret'))
      assert(_id, 401, '请重新登录')
      req.user = await AdminUser.findById(_id)
      assert(req.user, 401, '请重新登录')
      next()
      return
    } catch (err) {
      if (err.name == 'TokenExpiredError') {
        const authTokenData = await redis.HGETALL(token)
        assert(Object.keys(authTokenData).length, 401, 'token过期, 请重新登录')
        await redis.DEL(token)
        req.user = await AdminUser.findById(authTokenData._id)
        const newToken = jwt.sign(authTokenData, app.get('secret'), { expiresIn: 60 * 30 });
        await redis.HSET(newToken, authTokenData, {
          EX: 3600 * 24 * 30
        })
        req.token = newToken
        next()
        return
      }
      assert(false, 401, '请重新登录')
    }
  }
}
