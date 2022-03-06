const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'AdminUser' },
    title: { type: String },
    tag: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Tag' }],
    body: { type: String },
    status: { type: Boolean },
    comment: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', schema);
