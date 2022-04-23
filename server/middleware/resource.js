module.exports = options => {
  const assert = require('http-assert');
  return async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource);
    assert(modelName !== 'Account', 404, '接口不存在');
    req.Model = require(`../models/${modelName}.js`);
    next();
  };
};
