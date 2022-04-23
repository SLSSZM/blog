module.exports = options => {
  const assert = require('http-assert');
  return async (req, res, next) => {
    assert(req.user.role === 'root', 404, '权限不足');
    next();
  };
};
