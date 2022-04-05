const express = require('express');
const app = express();

app.use(require('cors')());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.set('secret', 'dfhasdhfisf143r42adsfasf789670fd');
app.set('api', 'http://localhost');
app.set('post', '3005');
app.set('fullApi', app.get('api') + ':' + app.get('post'));

require('./plugin/db.js')(app);

require('./routes/admin/index.js')(app);
require('./routes/web/index.js')(app);

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
