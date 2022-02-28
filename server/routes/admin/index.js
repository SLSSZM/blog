module.exports = (app) => {
  const router = require('express').Router();
  const AdminUser = require('../../models/AdminUser.js')
  const assert = require('http-assert');
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
  const resource = require('../../middleware/resource')
  const auth = require('../../middleware/auth.js')
  const redis = require('../../plugin/redis')

  router.get('/', async (req, res) => {
    let query = req.query || {}
    query = Object.assign({ userId: req.user._id }, query)

    let queryOptions = {}
    if (req.Model.modelName === 'Article') {
      queryOptions.populate = 'tag'
    }
    const model = await req.Model.find(query).setOptions(queryOptions)

    res.send({
      code: 200,
      data: model,
      token: req.token
    })
    return
  })
  router.get('/:id', async (req, res) => {
    assert(req.params.id, 422, 'id不能为空')
    const model = req.Model.findById(req.params.id)
    res.send({
      code: 200,
      data: model,
      token: req.token.token
    })
  })
  router.post('/', async (req, res) => {
    assert(req.body, 422, '参数不能为空')
    const body = Object.assign(req.body, { userId: req.user._id })
    const model = req.Model.create(body)
    res.send({
      code: 200,
      data: model,
      token: req.token.token
    })
  })
  router.put('/:id', async (req, res) => {
    assert(req.params.id, 422, 'id不能为空')
    assert(req.body, 422, '参数不能为空')
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send({
      code: 200,
      data: model,
      token: req.token.token
    })
  })
  router.delete('/:id', async (req, res) => {
    assert(req.params.id, 422, 'id不能为空')
    const model = await req.Model.findByIdRemove(req.params.id)
    res.send({
      code: 200,
      data: model,
      token: req.token.token
    })
  })

  app.use('/api/admin/rest/:resource', auth(app), resource(), router);

  // 登录
  app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;
    // 根据用户名找用户
    const user = await AdminUser.findOne({ username }).select('+password');
    assert(user, 422, '用户不存在');
    const isValid = bcrypt.compareSync(password, user.password);
    assert(isValid, 422, '密码错误');
    // 返回token
    const token = jwt.sign({ _id: user._id, username: user.username }, app.get('secret'), { expiresIn: 60 * 30 });
    await redis.HSET(token, { _id: user._id, username: user.username }, {
      EX: 3600 * 24 * 30
    })
    res.send({
      code: 200,
      token,
      data: { menu: user.menu, username: user.username },
    });
  });
  // 退出登陆
  app.delete('/api/admin/loginout', async (req, res) => {
    const token = String(req?.headers?.authorization || '')?.split(' ')?.pop()
    await redis.del(token)
    res.send({
      code: 200
    })
  })

};
