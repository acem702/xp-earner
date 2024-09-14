// models/userData.model.js
const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  balance: { type: Number, required: true }
});

module.exports = mongoose.model('userData', userDataSchema, 'userData');
