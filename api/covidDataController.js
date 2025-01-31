const HttpStatus = require("http-status-codes");
const genericResponse = require('./genericResponse');
const router = require('express').Router();
const mongoose = require('mongoose');
const {fetchCovidDataByCountryAndStateName} = require("../service/covidDataService");
const {fetchCovidDataByCountryName} = require("../service/covidDataService");

const Token = mongoose.model('tokens');

router.get('/countries/:name', async (req, res) => {
  return await res.json(genericResponse.ok(await fetchCovidDataByCountryName(req.params.name)));
});

router.get('/countries/:countryName/states/:stateName', async (req, res) => {
  return await res.json(genericResponse.ok(await fetchCovidDataByCountryAndStateName(req.params.countryName, req.params.stateName)));
});

module.exports = router;
