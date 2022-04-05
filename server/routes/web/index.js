const webAuth = require('../../middleware/webAuth.js');
const router = require('express').Router();
const assert = require('http-assert');
const Config = require('../../models/Config.js');
const Article = require('../../models/Article.js');
const Message = require('../../models/Message.js');
const Tag = require('../../models/Tag.js');

module.exports = app => {
  router.get('/config', async (req, res) => {
    const configs = await Config.findOne({ userId: req.user._id });
    const articles = await Article.find({ userId: req.user._id, submit: true })
      .populate('tag')
      .sort({ createdAt: -1 })
      .limit(10);
    const tags = await Tag.find({ userId: req.user._id });
    res.send({
      code: 200,
      data: { configs, articles, tags },
    });
  });
  router.get('/article', async (req, res) => {
    let query = req.query || {};
    if (query.tag) {
      query.tag = JSON.parse(query.tag);
    }
    query.title = new RegExp(query.title, 'ig');
    const model = await Article.aggregate([
      {
        $match: { userId: req.user._id, title: query.title },
      },
      {
        $lookup: {
          from: 'tags',
          localField: 'tag',
          foreignField: '_id',
          as: 'tag',
        },
      },
      {
        $match: query.tag && query.tag.length ? { 'tag.name': { $in: query.tag } } : {},
      },
      {
        $skip: req.query.page || 0,
      },
      {
        $limit: req.query.count || 10,
      },
    ]);
    res.send({
      code: 200,
      data: model,
    });
  });
  router.get('/article/:id', async (req, res) => {
    assert(req.params.id, 400, 'id不能为空');
    const model = await Article.findById(
      req.params.id,
      { submit: false },
      { submit: true }
    ).populate('tag');
    res.send({
      code: 200,
      data: model,
    });
  });
  router.get('/message', async (req, res) => {
    const model = await Message.find({ userId: req.user._id });
    res.send({
      code: 200,
      data: model,
    });
  });
  router.post('/message', async (req, res) => {
    const model = await Message.create({ userId: req.user._id, ...req.body });
    res.send({
      code: 200,
      data: model,
    });
  });
  app.use('/api/web', webAuth(), router);
};
