const router = require('express').Router();
const genericResponse = require('./genericResponse');
const passport = require('passport');
const {checkIfVerified} = require('./../service/authService');
const User = require('./../model/user');
router.use(passport.authenticate('jwt', {session: false}));
router.use(checkIfVerified);

router.get('/me', (req, res) => {
  res.json(genericResponse.ok({
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
  }))
});

module.exports = router;
