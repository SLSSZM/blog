module.exports = (app) => {
  const router = require('express').Router();
  const assert = require('http-assert');
  const auth = require('../../middleware/auth.js');
  const Config = require('../../models/Config.js');

  router.get('/', async (req, res) => {
    let model = await Config.findOne({ userId: req.user._id }).select('+userId');
    if (!model) {
      model = await Config.create({ userId: req.user._id }).select('+userId');
    }
    res.send({
      code: 200,
      data: model || {},
      token: req.token,
    });
  });
  router.put('/', async (req, res) => {
    await Config.findByIdAndUpdate(req.body._id, req.body);
    res.send({
      code: 200,
      token: req.token,
    });
  });

  app.use('/api/admin/config', auth(app), router);
};
