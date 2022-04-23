module.exports = app => {
  const router = require('express').Router();
  const assert = require('http-assert');
  const auth = require('../../middleware/auth.js');
  const AdminUser = require('../../models/AdminUser.js');
  const roleAuth = require('../../middleware/RoleAuth.js');

  router.get('/', async (req, res) => {
    const { count = 10, page = 1, username = '' } = req.params;
    let list = await AdminUser.find({
      username: new RegExp(username, 'ig'),
    })
      .limit(count)
      .skip((page - 1) * count);
    let total = await AdminUser.find({
      username: new RegExp(username, 'ig'),
    }).count();
    res.send({
      code: 200,
      data: { list, total },
      token: req.token,
    });
  });
  router.post('/', async (req, res) => {
    assert(req.body.username && req.body.password, 422, '用户名或密码不能为空');
    let model = await AdminUser.create(req.body);
    res.send({
      code: 200,
      data: model || {},
      token: req.token,
    });
  });
  router.put('/:id', async (req, res) => {
    assert(req.body.username && req.body.password, 422, '用户名或密码不能为空');

    let model = await AdminUser.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      code: 200,
      data: model || {},
      token: req.token,
    });
  });
  router.delete('/:id', async (req, res) => {
    let model = await AdminUser.findByIdAndDelete(req.params.id);
    res.send({
      code: 200,
      data: model || {},
      token: req.token,
    });
  });

  app.use('/api/admin/account', auth(app), roleAuth(), router);
};
