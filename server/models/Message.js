const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'AdminUser', index: true, select: false },
    content: { type: String },
    mail: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Message', schema);
