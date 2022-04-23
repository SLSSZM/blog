const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Role } = require('../common/enum');

const schema = new mongoose.Schema(
  {
    username: { type: String },
    password: {
      type: String,
      select: false,
      set(value) {
        return bcrypt.hashSync(value, bcrypt.genSaltSync(10));
      },
    },
    role: { type: String, enum: Role, default: 'normal' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AdminUser', schema);
