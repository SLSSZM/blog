const express = require('express');
const app = express();

app.use(require('cors')());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('secret', 'dfhasdhfisf143r42adsfasf789670fd');

require('./plugin/db.js')(app);

require('./routes/admin/index.js')(app);

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

app.listen(3001, () => {
  console.log('http://localhost:3001');
});
