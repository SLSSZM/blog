const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false,
    set(value) {
      return bcrypt.hashSync(value, bcrypt.genSaltSync(10));
    },
  },
});

module.exports = mongoose.model('AdminUser', schema);
