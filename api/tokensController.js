const HttpStatus = require("http-status-codes");
const genericResponse = require('./genericResponse');
const router = require('express').Router();
const mongoose = require('mongoose');

const Token = mongoose.model('tokens');

router.get('/:emailVerificationToken/verify', async (req, res) => {
  const emailVerificationToken = req.params.emailVerificationToken;
  const token = await Token.findOne({token: emailVerificationToken}).populate('user');
  if (token && token.user) {
    token.user.isVerified = true;
    await token.user.save();
    await token.remove();
    return res.redirect(`/auth/login`);
  }
});

module.exports = router;
