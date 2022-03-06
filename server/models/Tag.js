const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String },
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'AdminUser' },
});

module.exports = mongoose.model('Tag', schema);
