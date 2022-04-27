const mongoose = require('mongoose');
const { ArticleType } = require('../common/enum');

const schema = new mongoose.Schema({
  name: { type: String, index: true },
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'AdminUser', index: true, select: false },
  type: { type: String, enum: ArticleType, default: 'article' },
});

module.exports = mongoose.model('Tag', schema);
