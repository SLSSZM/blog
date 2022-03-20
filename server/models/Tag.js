const mongoose = require('mongoose');
const { Type } = require('../common/enum');

const schema = new mongoose.Schema({
  name: { type: String, index: true },
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'AdminUser', index: true },
  type: { type: String, enum: Type },
});

module.exports = mongoose.model('Tag', schema);
