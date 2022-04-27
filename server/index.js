const express = require('express');
const compression = require('compression');
const serverStatic = require('serve-static');
const dotenv = require('dotenv');
const { resolve } = require('path');

const app = express();
// 加载环境变量
dotenv.config();
// 配置
app.use(require('cors')());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 全局变量
app.set('secret', process.env.SECRET || 'dfhasdhfisf143r42adsfasf789670fd');
app.set('api', process.env.API || 'http://localhost');
app.set('port', process.env.PORT || '3005');
app.set('fullApi', app.get('api') + ':' + app.get('port'));

// 路由和数据库
require('./plugin/db.js')(app);
require('./routes/admin/index.js')(app);
require('./routes/web/index.js')(app);

// 静态资源
app.use(compression());
app.use(
  '/admin',
  serverStatic(resolve(__dirname + '/public/admin'), {
    maxAge: '1y',
  })
);
app.use(
  '/uploads',
  serverStatic(resolve(__dirname + '/public/uploads'), {
    maxAge: '1y',
  })
);

// 错误响应
app.use(async (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ message: err.message, code: 401 });
    return;
  }
  res.status(err.status || 500).send({
    message: err.message,
    code: err.status || 500,
  });
});

app.listen(3005, () => {
  console.log(app.get('fullApi'));
});
