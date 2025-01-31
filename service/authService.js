const genericResponse = require('./../api/genericResponse');
const sendMail = require('./emailService');
const {nanoid} = require('nanoid');
const mongoose = require('mongoose');

const Token = mongoose.model('tokens');

const generateEmailVerificationToken = () => {
  return nanoid(128);
};

const sendEmailVerificationMail = async (req, user) => {
  const token = new Token({
    token: generateEmailVerificationToken(),
    user: user._id
  });
  const savedToken = await token.save();
  const baseUrl = req.protocol + '://' + req.get('host');
  const tokenPath = '/api/tokens/' + savedToken.token + '/verify';
  let verifyTokenEndpoint = baseUrl + tokenPath;
  let emailResult = await sendMail(user.email, "Covid-19 | Verification de l'email", `<h4>Salut !</h4><h4>Merci d'avoir créé votre compte sur 241 Covid-19 Info. Pour terminer votre inscription, cliquez sur le lien ci-dessous:</h4>${verifyTokenEndpoint}<br/><h4>Cordialement.</h4><br/>`);
  console.log(emailResult);
};

const checkIfVerified = async (req, res, next) => {
  if (req.user.isVerified) {
    return next();
  }
  sendEmailVerificationMail(req, req.user).then(() => console.log("email process complete"));
  return res.json(genericResponse.genericResponse(401, "E-mail non vérifié", {message: "Veuillez vérifier votre email"}));
};

module.exports = {
  checkIfVerified,
  generateToken: generateEmailVerificationToken,
  sendEmailVerificationMail
};
