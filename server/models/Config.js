const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: 'AdminUser', index: true, select: false },
    image: { type: String, default: '' },
    myAvatar: { type: String, default: '' },
    userAvatar: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Config', schema);
