const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionAnswer = new Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Token = mongoose.model('questionAnswers', questionAnswer);
