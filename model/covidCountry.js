const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const covidCountrySchema = new Schema({
  FIPS: {
    type: String,
    required: false
  },
  Admin2: {
    type: String,
    required: false
  },
  Province_State: {
    type: String,
    required: false
  },
  Country_Region: {
    type: String,
    required: false
  },
  Last_Update: {
    type: String,
    required: false
  },
  Lat: {
    type: String,
    required: false
  },
  Long_: {
    type: String,
    required: false
  },
  Confirmed: {
    type: String,
    required: false
  },
  Deaths: {
    type: String,
    required: false
  },
  Recovered: {
    type: String,
    required: false
  },
  Active: {
    type: String,
    required: false
  },
  Combined_Key: {
    type: String,
    required: false
  },
});

module.exports = CovidCountrySchema = mongoose.model('covidCountries', covidCountrySchema);
