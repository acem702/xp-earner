// models/referral.model.js
const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  userId: { type: number, unique: true, required: true },
  referralId: { type: number, required: true },
  date: { type: Date, required: true }
});

module.exports = mongoose.model('referral', referralSchema, 'referral');
