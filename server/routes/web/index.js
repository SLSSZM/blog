const webAuth = require('../../middleware/webAuth.js');
const router = require('express').Router();
const assert = require('http-assert');
const Config = require('../../models/Config.js');
const Article = require('../../models/Article.js');
const Message = require('../../models/Message.js');
const Tag = require('../../models/Tag.js');

module.exports = app => {
  router.get('/config', async (req, res) => {
    let configs = {};
    if (req.query.addView === 'true') {
      configs = await Config.findOneAndUpdate({ userId: req.user._id }, { $inc: { views: 1 } });
    } else {
      configs = await Config.findOne({ userId: req.user._id });
    }
    const tags = await Tag.find({ userId: req.user._id });
    res.send({
      code: 200,
      data: { configs, tags },
    });
  });
  router.get('/home', async (req, res) => {
    const articles = await Article.find({ userId: req.user._id, submit: true })
      .populate('tag')
      .sort({ createdAt: -1 })
      .limit(10);
    res.send({
      code: 200,
      data: articles,
    });
  });
  router.get('/article', async (req, res) => {
    let query = req.query || {};
    if (query.tag) {
      query.tag = JSON.parse(query.tag);
    }
    query.title = new RegExp(query.title, 'ig');
    query.page = +(query.page || 1);
    query.count = +(query.count || 10);
    const list = await Article.aggregate([
      {
        $match: { userId: req.user._id, title: query.title, submit: true },
      },
      {
        $sort: { createdAt: -1 },
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
        $skip: query.count * (query.page - 1),
      },
      {
        $limit: query.count,
      },
    ]);
    const count = await Article.aggregate([
      {
        $match: { userId: req.user._id, title: query.title, submit: true },
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
        $count: 'total',
      },
    ]);
    res.send({
      code: 200,
      data: { list, total: count[0].total },
    });
  });
  router.get('/article/:id', async (req, res) => {
    assert(req.params.id, 400, 'id????????????');
    let model = {};
    if (req.query.addView) {
      model = await Article.findByIdAndUpdate({ _id: req.params.id }, { $inc: { views: 1 } })
        .select('-submit')
        .populate('tag');
    } else {
      model = await Article.findById(req.params.id).select('-submit').populate('tag');
    }
    res.send({
      code: 200,
      data: model,
    });
  });
  router.get('/message', async (req, res) => {
    const list = await Message.find({ userId: req.user._id })
      .skip(req.query.count * (req.query.page - 1) || 0)
      .limit(req.query.count || 10)
      .select('-email')
      .sort({ createdAt: -1 });
    const total = await Message.find({ userId: req.user._id }).count();
    res.send({
      code: 200,
      data: { list, total },
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
