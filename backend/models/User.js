const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  job: { type: String, required: true },
  avatar: { type: String, required: false }
});

module.exports = mongoose.model('User', userSchema);