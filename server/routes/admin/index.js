const router = require('express').Router();
const AdminUser = require('../../models/AdminUser.js');
const Article = require('../../models/Article.js');
const assert = require('http-assert');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const resource = require('../../middleware/resource');
const auth = require('../../middleware/auth.js');
const redis = require('../../plugin/redis');
const multer = require('multer');
const Config = require('../../models/Config.js');
const path = require('path');

module.exports = app => {
  require('./config')(app);
  require('./account')(app);

  router.get('/', async (req, res) => {
    let query = req.query || {};
    const page = query.page || undefined;
    const count = query.count || undefined;
    delete query.page;
    delete query.count;
    for (const i in query) {
      if (!query[i]) {
        delete query[i];
      } else {
        query[i] = new RegExp(query[i], 'ig');
      }
    }
    query.userId = req.user._id;

    let queryOptions = {};
    if (req.Model.modelName === 'Article') {
      queryOptions.populate = 'tag';
    }
    page && (queryOptions.skip = count * (page - 1));
    count && (queryOptions.limit = count);

    const list = await req.Model.find(query).setOptions(queryOptions);
    const total = await req.Model.find(query).count();
    res.send({
      code: 200,
      data: { list, total },
      token: req.token,
    });
    return;
  });
  router.get('/:id', async (req, res) => {
    assert(req.params.id, 400, 'id不能为空');
    const model = await req.Model.findById(req.params.id);
    res.send({
      code: 200,
      data: model,
      token: req.token,
    });
  });
  router.post('/', async (req, res) => {
    assert(req.body, 400, '参数不能为空');
    const body = Object.assign(req.body, { userId: req.user._id });
    const model = await req.Model.create(body);
    res.send({
      code: 200,
      data: model,
      token: req.token,
    });
  });
  router.put('/:id', async (req, res) => {
    assert(req.params.id, 400, 'id不能为空');
    assert(req.body, 400, '参数不能为空');
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      code: 200,
      data: model,
      token: req.token,
    });
  });
  router.delete('/:id', async (req, res) => {
    assert(req.params.id, 400, 'id不能为空');
    const model = await req.Model.findByIdAndDelete(req.params.id);
    res.send({
      code: 200,
      data: model,
      token: req.token,
    });
  });

  app.use('/api/admin/rest/:resource', auth(app), resource(), router);

  // 登录
  app.post('/api/admin/login', async (req, res) => {
    const { username, password } = req.body;
    // 根据用户名找用户
    const user = await AdminUser.findOne({ username }).select('+password');
    assert(user, 401, '账号或密码错误');
    const isValid = bcrypt.compareSync(password, user.password);
    assert(isValid, 401, '账号或密码错误');
    const oldToken = await redis.get(user._id);
    await redis.multi().del(user._id).del(oldToken).exec();
    // 返回token
    const token = jwt.sign({ _id: user._id, username: user.username }, app.get('secret'), {
      expiresIn: 60 * 30,
    });
    await redis
      .multi()
      .hSet(token, { _id: user._id, username: user.username })
      .expire(token, 3600 * 24 * 30)
      .set(user._id, token, { EX: 3600 * 24 * 30 })
      .exec();
    res.send({
      code: 200,
      data: { username: user.username, role: user.role },
      token,
    });
  });
  // 退出登陆
  app.delete('/api/admin/loginout', async (req, res) => {
    if (!req?.headers?.authorization) {
      res.send({
        code: 200,
      });
      return;
    }
    const token = String(req?.headers?.authorization || '')
      ?.split(' ')
      ?.pop();
    const _id = await redis.hGet(token, '_id');
    await redis.multi().del(token).del(_id).exec();
    res.send({
      code: 200,
    });
  });
  // 访问量
  app.get('/api/admin/workbench', auth(app), async (req, res) => {
    const userViews = (await Config.findOne({ userId: req.user._id }))?.views;
    const articleTotal = await Article.find({ userId: req.user._id }).count();
    const hotArticles = await Article.find({ userId: req.user._id }).sort({ views: -1 }).limit(3);
    res.send({
      code: 200,
      data: { userViews, articleTotal, hotArticles },
      token: req.token,
    });
  });
  // 图片上传api
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/../../public/uploads');
    },
    filename: function (req, file, cb) {
      let extname = path.extname(file.originalname);
      const filedname =
        file.originalname.split('.')[0] + Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, filedname + extname); //文件名
    },
  });
  const upload = multer({ storage });
  app.post('/api/admin/upload', auth(app), upload.single('file'), (req, res) => {
    const file = req.file;
    file.url = app.get('fullApi') + '/uploads/' + file.filename;
    res.send({
      code: 200,
      data: file,
      token: req.token,
    });
  });

  // 初始化
  app.get('/api/admin/init', async (req, res) => {
    const users = await AdminUser.find();
    if (users.length) {
      res.send({
        code: 200,
        data: '服务端正常',
      });
    } else {
      const model = await AdminUser.create({
        username: 'admin',
        password: '123456',
        role: 'root',
      });
      res.send({
        code: 200,
        data: {
          data: model,
          msg: '初始化成功, 初始化账号为admin， 密码123456',
        },
      });
    }
  });
};
