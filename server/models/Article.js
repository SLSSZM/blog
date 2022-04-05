const mongoose = require('mongoose');
const { Type } = require('../common/enum');

const schema = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'AdminUser', index: true, select: false },
    title: { type: String, index: true },
    description: { type: String },
    tag: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Tag' }],
    body: { type: String },
    submit: { type: Boolean },
    image: { type: String },
    type: { type: String, enum: Type },
    views: { type: Number, default: 0 },
    comment: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Article', schema);
