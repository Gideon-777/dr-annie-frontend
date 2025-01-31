const HttpStatus = require("http-status-codes");
const genericResponse = require('./genericResponse');
const router = require('express').Router();
const mongoose = require('mongoose');
const {fetchCovidDataByCountryAndStateName} = require("../service/covidDataService");
const {fetchCovidDataByCountryName} = require("../service/covidDataService");
const ContactForm = mongoose.model('contactForms');

const User = require('./../model/user');

router.get('/user-data', async (req, res) => {
  await res.json(genericResponse.ok(await User.find({}).populate('questionAnswers')));
});

router.get('/user-data/:userId', async (req, res) => {
  await res.json(genericResponse.ok(await User.findById(req.params.userId).populate('questionAnswers')));
});

router.get('/contact-us-data', async (req, res) => {
  await res.json(genericResponse.ok(await ContactForm.find({})));
});

router.get('/contact-us-data/:formId', async (req, res) => {
  await res.json(genericResponse.ok(await ContactForm.findById(req.params.formId)));
});

module.exports = router;
