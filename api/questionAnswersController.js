const HttpStatus = require("http-status-codes");
const genericResponse = require('./genericResponse');
const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');
const {getQuestionAnswersForUser} = require("../service/questionAnswerService");
const {addQuestionAnswer} = require("../service/questionAnswerService");

router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  if (await addQuestionAnswer(req.user._id, req.body.question, req.body.answer)) {
    return res.json(genericResponse.ok({message: "Question et réponse mises à jour avec succès"}));
  }
  return res.json(genericResponse.genericResponse(HttpStatus.BAD_REQUEST, "Impossible de mettre à jour la question et la réponse"));
});

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  return res.json(genericResponse.ok(await getQuestionAnswersForUser(req.user._id)));
});

module.exports = router;
