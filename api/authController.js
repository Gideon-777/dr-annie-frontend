const HttpStatus = require("http-status-codes");
const genericResponse = require('./genericResponse');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const {sendEmailVerificationMail} = require('./../service/authService');

const User = require('./../model/user');
const {secret} = require('./../config/keys');

router.post('/register', (req, res) => {
  User.findOne({email: req.body.email}).then(user => {
    if (user) {
      return res.status(200).json(genericResponse.genericResponse(HttpStatus.BAD_REQUEST, "Impossible de s'inscrire"));
    } else {
      const newUser = new User({
        ...req.body,
        phoneNumber: {
          ...req.body.phoneNumber
        }
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser.save().then(user => {
            sendEmailVerificationMail(req, user);
            res.status(200).json(genericResponse.genericResponse(HttpStatus.CREATED, "Enregistré avec succès", {message: "Veuillez vérifier votre email"}))
          });
        });
      })
    }
  });
});

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  User.findOne({email}).then(user => {
    if (!user) {
      return res.status(200).json(genericResponse.genericResponse(HttpStatus.UNAUTHORIZED, "E-mail ou mot de passe incorrect"));
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        return res.status(200).json(genericResponse.genericResponse(HttpStatus.UNAUTHORIZED, "E-mail ou mot de passe incorrect"));
      }
      if (!user.isVerified) {
        sendEmailVerificationMail(req, user);
        return res.json(genericResponse.genericResponse(401, "E-mail non vérifié", {message: "Veuillez vérifier votre email"}));
      }
      const payload = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      jwt.sign(payload, secret, {expiresIn: '1d'}, (err, token) => {
        res.json(genericResponse.ok({
          success: true,
          token: 'Bearer ' + token
        }));
      });
    }).catch((e) => {
      console.log(e);
      return res.status(200).json(genericResponse.genericResponse(HttpStatus.UNAUTHORIZED, "E-mail ou mot de passe incorrect"));
    });
  });
});

router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  if (req.user) {
    const payload = {
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    };
    jwt.sign(payload, secret, {expiresIn: '1d'}, (err, token) => {
      return res.redirect(`/auth/google?token=${'Bearer ' + token}`);
    });
    return;
  }
  return res.status(200).json(genericResponse.genericResponse(HttpStatus.UNAUTHORIZED, "E-mail ou mot de passe incorrect"));
});

module.exports = router;
