// models/referral.model.js
const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  userId: { type: Number, unique: true, required: true },
  referralId: { type: Number, required: true },
  date: { type: Date, required: true }
});

module.exports = mongoose.model('referral', referralSchema, 'referral');
