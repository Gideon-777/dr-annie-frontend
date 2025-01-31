const mongoose = require('mongoose');

const CovidCountry = mongoose.model('covidCountries');

const updateDataInDb = async (data) => {
  await CovidCountry.deleteMany({});
  data.forEach(country => new CovidCountry({...country})
    .save()
    .then(() => console.log("Mise a Jour: ", country.Country_Region, country.Province_State))
    .catch(() => console.log("Impossible de mettre a jour: ", country.Country_Region, country.Province_State))
  );
};

const fetchCovidDataByCountryName = async (countryName) => {
  let countryRecordsCount = await CovidCountry.countDocuments({
    Country_Region: {
      '$regex': countryName,
      '$options': 'i'
    }
  });
  if (countryRecordsCount === 0 || countryRecordsCount > 1) {
    return {
      count: countryRecordsCount,
      data: {}
    };
  }
  let countryRecord = await CovidCountry.findOne({Country_Region: {'$regex': countryName, '$options': 'i'}});
  return {
    count: countryRecordsCount,
    data: countryRecord
  };
};

const fetchCovidDataByCountryAndStateName = async (countryName, stateName) => {
  let stateRecords = await CovidCountry.find({
    Country_Region: {'$regex': countryName, '$options': 'i'},
    Province_State: {'$regex': stateName, '$options': 'i'}
  });
  let count = stateRecords.length;
  if (stateRecords.length === 0) {
    return {
      count,
      data: {}
    };
  }
  let currentState = stateRecords.pop();
  currentState = {
    Confirmed: currentState.Confirmed,
    Recovered: currentState.Recovered,
    Active: currentState.Active,
    Deaths: currentState.Deaths,
    FIPS: currentState.FIPS,
    Admin2: currentState.Admin2,
    Province_State: currentState.Province_State,
    Country_Region: currentState.Country_Region,
    Last_Update: currentState.Last_Update,
    Lat: currentState.Lat,
    Long: currentState.Long,
    Combined_Key: currentState.Combined_Key
  };
  let countryRecord = stateRecords.reduce((prev, cur) => {
    return {
      Confirmed: parseInt(cur.Confirmed) + parseInt(prev.Confirmed),
      Recovered: parseInt(cur.Recovered) + parseInt(prev.Recovered),
      Active: parseInt(cur.Active) + parseInt(prev.Active),
      Deaths: parseInt(cur.Deaths) + parseInt(prev.Deaths),
      FIPS: currentState.FIPS,
      Admin2: currentState.Admin2,
      Province_State: currentState.Province_State,
      Country_Region: currentState.Country_Region,
      Last_Update: currentState.Last_Update,
      Lat: currentState.Lat,
      Long: currentState.Long,
      Combined_Key: currentState.Combined_Key
    }
  }, currentState);
  return {
    count,
    data: countryRecord
  };
};

module.exports = {
  updateDataInDb,
  fetchCovidDataByCountryName,
  fetchCovidDataByCountryAndStateName
};
