const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    content: { type: String },
    mail: { type: String },
    comment: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Comment', schema);
