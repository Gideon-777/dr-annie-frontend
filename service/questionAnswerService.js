const mongoose = require('mongoose');

const QuestionAnswer = mongoose.model('questionAnswers');
const User = mongoose.model('users');

const addQuestionAnswer = async (userId, question, answer) => {
  let user = await User.findById(userId);
  if (!user) {
    return null;
  }
  const questionAnswer = await new QuestionAnswer({
    question,
    answer
  }).save();
  user.questionAnswers.push(questionAnswer);
  return await user.save();
};

const getQuestionAnswersForUser = async (userId) => {
  let user = await User.findById(userId).populate('questionAnswers');
  if (!user) {
    return null;
  }
  return user;
};

module.exports = {
  addQuestionAnswer,
  getQuestionAnswersForUser
};
