const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  phoneNumber: {
    code: {
      type: String
    },
    number: {
      type: String
    }
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false
  },
  isPhoneVerified: {
    type: Boolean,
    required: true,
    default: false
  },
  googleId: {
    type: String,
  },
  country: {
    type: String,
  },
  questionAnswers: [{
    type: Schema.Types.ObjectId,
    ref: 'questionAnswers'
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', userSchema);
